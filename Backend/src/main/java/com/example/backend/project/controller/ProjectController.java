package com.example.backend.project.controller;

import com.example.backend.collaborations.model.Collaboration;
import com.example.backend.collaborations.service.CollaborationsService;
import com.example.backend.companies.service.CompanyService;
import com.example.backend.project.controller.dpo.FRTeamMemberDPO;
import com.example.backend.project.controller.dpo.ProjectAndFRTeamMembersDPO;
import com.example.backend.project.controller.dto.CollaborationDTO;
import com.example.backend.project.controller.dto.ProjectDTO;
import com.example.backend.project.model.Project;
import com.example.backend.project.service.ProjectService;
import com.example.backend.user.model.AUTHORITY;
import com.example.backend.user.model.AppUser;
import com.example.backend.user.service.UserService;
import com.example.backend.util.JwtVerifier;
import com.example.backend.util.exceptions.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.*;

@SuppressWarnings("ALL")
@CrossOrigin
@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;
    private final UserService userService;
    private final CollaborationsService collaborationsService;
    private final CompanyService companyService;

    @GetMapping()
    @ResponseBody
    public ResponseEntity getAllProjects(@RequestHeader String googleTokenEncoded){
        AppUser user = getUser(googleTokenEncoded);
        try {
            return new ResponseEntity(projectService.findAll(user), HttpStatus.FOUND);
        } catch (AuthenticationException e) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity getProjectById(@RequestHeader String googleTokenEncoded, @PathVariable Long id){
        AppUser user = getUser(googleTokenEncoded);
        try {
            return new ResponseEntity(projectService.findById(id, user), HttpStatus.FOUND);
        } catch (AuthenticationException e) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } catch (ProjectNotFoundException e) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping()
    public ResponseEntity addProject(@RequestHeader String googleTokenEncoded, @RequestBody ProjectDTO projectDTO){
        AppUser user = getUser(googleTokenEncoded);
        try {
            return new ResponseEntity(projectService.addProject(projectDTO, user), HttpStatus.CREATED);
        } catch (AuthenticationException e) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity updateProject(@RequestHeader String googleTokenEncoded, @RequestBody ProjectDTO projectDTO, @PathVariable Long id){
        AppUser user = getUser(googleTokenEncoded);
        try {
            return new ResponseEntity(projectService.updateProject(projectDTO, id, user), HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        } catch (ProjectNotFoundException e){
            return new ResponseEntity("Project not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteProjects(@RequestHeader String googleTokenEncoded, @PathVariable Long id){
        AppUser user = getUser(googleTokenEncoded);
        try {
            projectService.deleteProject(id, user);
            return new ResponseEntity(HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } catch (ProjectNotFoundException e){
            return new ResponseEntity("Project not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{projectid}/collaborations")
    public ResponseEntity getCollaborations(@RequestHeader String googleTokenEncoded, @PathVariable Long projectid){
        AppUser user = getUser(googleTokenEncoded);
        try {
            return new ResponseEntity(projectService.getCollaborations(projectid, user), HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } catch (ProjectNotFoundException e){
            return new ResponseEntity("Project not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{projectid}/collaborations")
    public ResponseEntity addCollaboration(@RequestHeader String googleTokenEncoded, @PathVariable Long projectid, @RequestBody CollaborationDTO collaborationDTO){
        AppUser user = getUser(googleTokenEncoded);

        try {
            return new ResponseEntity(collaborationsService.addCollaboration(projectid, collaborationDTO, user), HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } catch (ProjectNotFoundException e) {
            return new ResponseEntity("Project not found", HttpStatus.NOT_FOUND);
        } catch (CompanyNotFoundException e) {
            return new ResponseEntity("Company not found", HttpStatus.NOT_FOUND);
        } catch (ContactNotFoundException e) {
            return new ResponseEntity("Contact not found", HttpStatus.NOT_FOUND);
        } catch (UserNotFoundException e) {
            return new ResponseEntity("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{projectid}/collaborations/{companyid}")
    public ResponseEntity updateCollaboration(@RequestHeader String googleTokenEncoded, @PathVariable Long projectid,
                                           @PathVariable Long companyid, @RequestBody CollaborationDTO collaborationDTO) {
        AppUser user = getUser(googleTokenEncoded);

        try {
            return new ResponseEntity(collaborationsService.updateCollaboration(projectid, companyid, collaborationDTO, user), HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } catch (ProjectNotFoundException e) {
            return new ResponseEntity("Project not found", HttpStatus.NOT_FOUND);
        } catch (CompanyNotFoundException e) {
            return new ResponseEntity("Company not found", HttpStatus.NOT_FOUND);
        } catch (ContactNotFoundException e) {
            return new ResponseEntity("Contact not found", HttpStatus.NOT_FOUND);
        } catch (UserNotFoundException e) {
            return new ResponseEntity("User not found", HttpStatus.NOT_FOUND);
        } catch (CollaborationNotFoundException e) {
            return new ResponseEntity("Collaboration not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{projectid}/collaborations/{companyid}")
    public ResponseEntity deleteCollaboration(@RequestHeader String googleTokenEncoded, @PathVariable Long projectid,
                                           @PathVariable Long companyid) {
        AppUser user = getUser(googleTokenEncoded);

        try {
            collaborationsService.deleteCollaboration(projectid, companyid, user);
            return new ResponseEntity(HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } catch (ProjectNotFoundException e) {
            return new ResponseEntity("Project not found", HttpStatus.NOT_FOUND);
        } catch (CompanyNotFoundException e) {
            return new ResponseEntity("Company not found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{projectId}/frteammembers/{memberId}")
    public ResponseEntity addFrTeamMember(@RequestHeader String googleTokenEncoded, @PathVariable Long projectId, @PathVariable Long memberId){
        AppUser user = getUser(googleTokenEncoded);

        try {
            return new ResponseEntity(projectService.addFrTeamMember(projectId, memberId, user), HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } catch (ProjectNotFoundException e) {
            return new ResponseEntity("Project not found", HttpStatus.NOT_FOUND);
        } catch (UserNotFoundException e) {
            return new ResponseEntity("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{projectId}/frteammembers/{memberId}")
    public ResponseEntity deleteFrTeamMember(@RequestHeader String googleTokenEncoded, @PathVariable Long projectId, @PathVariable Long memberId){
        AppUser user = getUser(googleTokenEncoded);

        try {
            return new ResponseEntity(projectService.deleteFrTeamMember(projectId, memberId, user), HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } catch (ProjectNotFoundException e) {
            return new ResponseEntity("Project not found", HttpStatus.NOT_FOUND);
        } catch (UserNotFoundException e) {
            return new ResponseEntity("User not found", HttpStatus.NOT_FOUND);
        }
    }

    private AppUser getUser(String googleTokenEncoded){
        String email = JwtVerifier.verifyAndReturnEmail(googleTokenEncoded);
        if (email == null)
            return null;
        return userService.findByEmail(email);
    }
}
