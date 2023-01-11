package com.example.backend.project.controller;

import com.example.backend.project.controller.dpo.FRTeamMemberDPO;
import com.example.backend.project.controller.dpo.ProjectAndFRTeamMembersDPO;
import com.example.backend.project.controller.dto.ProjectDTO;
import com.example.backend.project.model.Project;
import com.example.backend.project.service.ProjectService;
import com.example.backend.user.model.AUTHORITY;
import com.example.backend.user.model.AppUser;
import com.example.backend.user.service.UserService;
import com.example.backend.util.JwtVerifier;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@SuppressWarnings("ALL")
@CrossOrigin
@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;
    private final UserService userService;

    @GetMapping()
    @ResponseBody
    public ResponseEntity getAllProjects(@RequestHeader String googleTokenEncoded){
        String email = JwtVerifier.verifyAndReturnEmail(googleTokenEncoded);
        if (email == null)
            return new ResponseEntity("Token is missing or invalid", HttpStatus.UNAUTHORIZED);
        if (userService.findByEmail(email) == null)
            return new ResponseEntity("You don't have access to CDB", HttpStatus.UNAUTHORIZED);

        return new ResponseEntity(projectService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity getProjectById(@RequestHeader String googleTokenEncoded, @PathVariable Long id){
        String email = JwtVerifier.verifyAndReturnEmail(googleTokenEncoded);
        if (email == null)
            return new ResponseEntity("Token is missing or invalid", HttpStatus.UNAUTHORIZED);
        if (userService.findByEmail(email) == null)
            return new ResponseEntity("You don't have access to CDB", HttpStatus.UNAUTHORIZED);

        Project project = projectService.findById(id).get();
        Set<FRTeamMemberDPO> frTeamMemberDPOSet = new HashSet<>();
        for (AppUser appUser: project.getFrteammembers()){ //iterating through project's FR team members to extract id, first and last name
            FRTeamMemberDPO x = new FRTeamMemberDPO(
                    appUser.getId(),
                    appUser.getFirstName(),
                    appUser.getLastName()
            );
            frTeamMemberDPOSet.add(x);
        }

        ProjectAndFRTeamMembersDPO projectAndFRTeamMembersDPO = new ProjectAndFRTeamMembersDPO(
                project.getId(),
                project.getIdCreator(),
                project.getName(),
                project.getCategory(),
                project.getType(),
                project.getStartDate(),
                project.getEndDate(),
                project.getFRResp(),
                project.getFRGoal(),
                project.getFirstPingDate(),
                project.getSecondPingDate(),
                frTeamMemberDPOSet
        );

        return new ResponseEntity(projectAndFRTeamMembersDPO, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity addProject(@RequestHeader String googleTokenEncoded, @RequestBody ProjectDTO projectDTO){
        List<AUTHORITY> a = List.of(AUTHORITY.MODERATOR, AUTHORITY.ADMIN);
        String email = JwtVerifier.verifyAndReturnEmail(googleTokenEncoded);
        if (email == null)
            return new ResponseEntity("Token is missing or invalid", HttpStatus.UNAUTHORIZED);
        if (userService.findByEmail(email) == null)
            return new ResponseEntity("You don't have access to CDB", HttpStatus.UNAUTHORIZED);
        if (!a.contains(userService.findByEmail(email).getAuthority()))
            return new ResponseEntity("You don't have premission to this resource", HttpStatus.UNAUTHORIZED);

        return new ResponseEntity(projectService.addProject(projectDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateProject(@RequestHeader String googleTokenEncoded, @RequestBody ProjectDTO projectDTO, @PathVariable Long id){
        List<AUTHORITY> a = List.of(AUTHORITY.MODERATOR, AUTHORITY.ADMIN);
        String email = JwtVerifier.verifyAndReturnEmail(googleTokenEncoded);
        if (email == null)
            return new ResponseEntity("Token is missing or invalid", HttpStatus.UNAUTHORIZED);
        if (userService.findByEmail(email) == null)
            return new ResponseEntity("You don't have access to CDB", HttpStatus.UNAUTHORIZED);
        if (!a.contains(userService.findByEmail(email).getAuthority()))
            return new ResponseEntity("You don't have premission to this resource", HttpStatus.UNAUTHORIZED);

        return new ResponseEntity(projectService.updateProject(projectDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteProjects(@RequestHeader String googleTokenEncoded, @PathVariable Long id){
        List<AUTHORITY> a = List.of(AUTHORITY.MODERATOR, AUTHORITY.ADMIN);
        String email = JwtVerifier.verifyAndReturnEmail(googleTokenEncoded);
        if (email == null)
            return new ResponseEntity("Token is missing or invalid", HttpStatus.UNAUTHORIZED);
        if (userService.findByEmail(email) == null)
            return new ResponseEntity("You don't have access to CDB", HttpStatus.UNAUTHORIZED);
        if (!a.contains(userService.findByEmail(email).getAuthority()))
            return new ResponseEntity("You don't have premission to this resource", HttpStatus.UNAUTHORIZED);

        return new ResponseEntity("Project under id: " + id + " Successfully deleted", HttpStatus.OK);
    }


}
