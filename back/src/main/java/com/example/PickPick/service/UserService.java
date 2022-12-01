package com.example.PickPick.service;

import com.example.PickPick.dto.ResultDto;
import com.example.PickPick.dto.UserDto;
import com.example.PickPick.domain.UserEntity;
import com.example.PickPick.mapper.UserMapper;
import com.example.PickPick.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public ResultDto userCheck(UserDto user){
        ResultDto result = new ResultDto();
        try{
            UserEntity userEntity = UserMapper.mapper.userDtoToEntity(user);
            Optional<UserEntity> userId = userRepository.findById(userEntity.getId());
            if(!userId.isEmpty()){
                result.setMsg("기존회원");
            }
            else{
                userRepository.save(userEntity);
                result.setMsg("신규회원");
            }
            result.setSuccess(true);
            result.setDetail(userEntity.getId());
        }
        catch(Exception e){
            result.setMsg("실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }
}
