package com.example.PickPick.user;

import com.example.PickPick.result.ResultDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public ResultDto save(UserDto user){
        UserEntity userEntity = UserMapper.mapper.userDtoToEntity(user);
        userRepository.save(userEntity);

        ResultDto result = ResultDto.builder()
                .msg("회원가입 성공")
                .success(true)
                .detail(user.getId())
                .build();

        return result;
    }
}
