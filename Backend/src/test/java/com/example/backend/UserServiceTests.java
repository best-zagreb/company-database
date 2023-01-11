package com.example.backend;

import com.example.backend.user.controller.dto.UserDTO;
import com.example.backend.user.model.AUTHORITY;
import com.example.backend.user.model.AppUser;
import com.example.backend.user.repo.UserRepository;
import com.example.backend.user.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceTests {
    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserService userService;

    @Test
    public void addUserTest() {
        UserDTO userDTO = new UserDTO(
                "peroperic@gmail.com",
                AUTHORITY.ADMIN,
                "pero",
                "peric",
                "nest@nesto.com",
                "opis",
                "perica"
        );
        AppUser test = new AppUser(
                "peroperic@gmail.com",
                AUTHORITY.ADMIN,
                "pero",
                "peric",
                "nest@nesto.com",
                "opis",
                "perica"
        );

        AppUser user = userService.addUser(userDTO);

        assertThat(user).isSameAs(test);
    }
}
