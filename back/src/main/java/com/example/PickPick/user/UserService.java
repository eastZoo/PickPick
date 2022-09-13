package com.example.PickPick.user;

import com.example.PickPick.result.ResultDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    //회원가입
    public ResultDto signup(UserDto user){
        ResultDto result = new ResultDto();
        try{
            UserEntity userEntity = UserMapper.mapper.userDtoToEntity(user);
            Optional<UserEntity> idCheck = userRepository.findById(userEntity.getId());
            if(!idCheck.isEmpty()){
                result.setMsg("아이디 중복");
                result.setDetail(userEntity.getId());
            }
            else{
                userRepository.save(userEntity);
                result.setMsg("회원가입 성공");
                result.setSuccess(true);
                result.setDetail(userEntity.getId());
            }
        } catch(Exception e){
            result.setMsg("회원가입 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }
}
