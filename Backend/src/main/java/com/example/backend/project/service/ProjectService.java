package com.example.backend.project.service;

import com.example.backend.collaborations.model.Collaboration;
import com.example.backend.collaborations.repo.CollaborationsRepository;
import com.example.backend.project.controller.dpo.FRTeamMemberDPO;
import com.example.backend.project.controller.dpo.ProjectAndFRTeamMembersDPO;
import com.example.backend.project.controller.dto.ProjectDTO;
import com.example.backend.project.model.Project;
import com.example.backend.project.repo.ProjectRepository;
import com.example.backend.user.model.AUTHORITY;
import com.example.backend.user.model.AppUser;
import com.example.backend.user.repo.UserRepository;
import com.example.backend.util.exceptions.ProjectNotFoundException;
import com.example.backend.util.exceptions.UserNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.AuthenticationException;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service @Transactional
@AllArgsConstructor
public class ProjectService {
    private ProjectRepository projectRepository;
    private UserRepository userRepository;
    private CollaborationsRepository collaborationsRepository;

    public List<Project> findAll(AppUser user) throws AuthenticationException {
        if (user == null) throw new AuthenticationException();

        return projectRepository.findAll();
    }

    public ProjectAndFRTeamMembersDPO findById(Long id, AppUser user) throws AuthenticationException, ProjectNotFoundException {
        if (user == null) throw new AuthenticationException();

        Project project;
        if (projectRepository.findById(id).isPresent()) project = projectRepository.findById(id).get();
        else throw new ProjectNotFoundException();
        Set<FRTeamMemberDPO> frTeamMemberDPOS = new HashSet<>();
        for (AppUser appUser: project.getFrteammembers()){
            FRTeamMemberDPO x = new FRTeamMemberDPO(
                appUser.getId(),
                appUser.getFirstName(),
                appUser.getLastName()
            );
            frTeamMemberDPOS.add(x);
        }
        return new ProjectAndFRTeamMembersDPO(project, frTeamMemberDPOS);
    }

    public Project addProject(ProjectDTO projectDTO, AppUser user) throws UserNotFoundException, AuthenticationException {
        if (user == null) throw new AuthenticationException();
        if (List.of(AUTHORITY.ADMINISTRATOR, AUTHORITY.MODERATOR).contains(user.getAuthority())) throw new AuthenticationException();

        AppUser frResp;
        if (userRepository.findById(projectDTO.getIdFRResp()).isPresent()) frResp = userRepository.findById(projectDTO.getIdFRResp()).get();
        else throw new UserNotFoundException();

        if (frResp.getAuthority() == AUTHORITY.OBSERVER || frResp.getAuthority() == AUTHORITY.FR_TEAM_MEMBER){
            frResp.setAuthority(AUTHORITY.FR_RESPONSIBLE);
            userRepository.save(frResp);
        }
        Project project = projectDTO.toProject();
        project.setFRResp(frResp);
        project.addFrTeamMember(user);
        return projectRepository.save(project);
    }

    public Project updateProject(ProjectDTO projectDTO, Long id, AppUser user) throws AuthenticationException, ProjectNotFoundException, UserNotFoundException {
        if (user == null) throw new AuthenticationException();
        if (List.of(AUTHORITY.ADMINISTRATOR, AUTHORITY.MODERATOR).contains(user.getAuthority())) throw new AuthenticationException();


        Project project;
        if (projectRepository.findById(id).isPresent()) project = projectRepository.findById(id).get();
        else throw new ProjectNotFoundException();

        project.setIdCreator(projectDTO.getIdCreator());
        project.setName(projectDTO.getName());
        project.setCategory(projectDTO.getCategory());
        project.setType(projectDTO.getType());
        project.setStartDate(projectDTO.getStartDate());
        project.setEndDate(projectDTO.getEndDate());
        if (userRepository.findById(projectDTO.getIdFRResp()).isPresent()) project.setFRResp(userRepository.findById(projectDTO.getIdFRResp()).get());
        else throw new UserNotFoundException();
        project.setFRGoal(projectDTO.getFRgoal());
        project.setFirstPingDate(projectDTO.getFirstPingDate());
        project.setSecondPingDate(projectDTO.getSecondPingDate());

        return projectRepository.save(project);
    }

    public List<Collaboration> getCollaborations(Long id, AppUser user) throws AuthenticationException, ProjectNotFoundException {
        if (user == null) throw new AuthenticationException();

        AUTHORITY authority = user.getAuthority();
        Project project;
        if (projectRepository.findById(id).isPresent()) project = projectRepository.findById(id).get();
        else throw new ProjectNotFoundException();

        if (authority == AUTHORITY.OBSERVER ||
                (authority == AUTHORITY.FR_TEAM_MEMBER && !project.getFrteammembers().contains(user)) ||
                (authority == AUTHORITY.FR_RESPONSIBLE && !Objects.equals(project.getFRResp().getId(), user.getId())))
            throw new AuthenticationException();

        return collaborationsRepository.findAllByCollaborationId_Project(project);
    }

    public Project addFrTeamMember(Long projectId, Long teamMemberId, AppUser user) throws AuthenticationException, ProjectNotFoundException, UserNotFoundException {
        if (user == null) throw new AuthenticationException();
        AUTHORITY authority = user.getAuthority();
        if (!List.of(AUTHORITY.ADMINISTRATOR, AUTHORITY.MODERATOR, AUTHORITY.FR_RESPONSIBLE).contains(authority))
            throw new AuthenticationException();
        Project project;
        if (projectRepository.findById(projectId).isPresent()) project = projectRepository.findById(projectId).get();
        else throw new ProjectNotFoundException();
        AppUser newFRTeamMember;
        if (userRepository.findById(teamMemberId).isPresent()) newFRTeamMember = userRepository.findById(teamMemberId).get();
        else throw new UserNotFoundException();

        if (authority == AUTHORITY.FR_RESPONSIBLE && !Objects.equals(project.getFRResp().getId(), user.getId())) {
            throw new AuthenticationException();
        }

        if (newFRTeamMember.getAuthority() == AUTHORITY.OBSERVER) {
            user.setAuthority(AUTHORITY.FR_TEAM_MEMBER);
            userRepository.save(user);
        }
        project.addFrTeamMember(user);

        return projectRepository.save(project);
    }

    public Project deleteFrTeamMember(Long projectId, Long teamMemberId, AppUser user) throws AuthenticationException, ProjectNotFoundException, UserNotFoundException {
        if (user == null) throw new AuthenticationException();

        Project project;
        if (projectRepository.findById(projectId).isPresent()) project = projectRepository.findById(projectId).get();
        else throw new ProjectNotFoundException();
        AppUser FRTeamMember;
        if (userRepository.findById(teamMemberId).isPresent()) FRTeamMember = userRepository.findById(teamMemberId).get();
        else throw new UserNotFoundException();

        project.removeFrTeamMember(FRTeamMember);
        if (FRTeamMember.getProjects().isEmpty() && FRTeamMember.getAuthority() == AUTHORITY.FR_TEAM_MEMBER){
            FRTeamMember.setAuthority(AUTHORITY.OBSERVER);
            userRepository.save(FRTeamMember);
        }
        return projectRepository.save(project);
    }

    public void deleteProject(Long id, AppUser user) throws AuthenticationException, ProjectNotFoundException {
        if (user == null) throw new AuthenticationException();
        if (List.of(AUTHORITY.ADMINISTRATOR, AUTHORITY.MODERATOR).contains(user.getAuthority())) throw new AuthenticationException();

        if (!projectRepository.existsById(id)) throw new ProjectNotFoundException();

        projectRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return projectRepository.existsById(id);
    }
}
