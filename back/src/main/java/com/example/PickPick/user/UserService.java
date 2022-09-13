package com.example.PickPick.user;

import com.example.PickPick.result.ResultDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public ResultDto signup(UserDto user){
        ResultDto result = new ResultDto();
        try{
            UserEntity userEntity = UserMapper.mapper.userDtoToEntity(user);
            Optional<UserEntity> userId = userRepository.findById(userEntity.getId());
            if(!userId.isEmpty()){
                result.setMsg("아이디 중복");
                result.setDetail(userEntity.getId());
            }
            else{
                userRepository.save(userEntity);
                result.setMsg("회원가입 성공");
                result.setSuccess(true);
                result.setDetail(userEntity.getId());
            }
        }
        catch(Exception e){
            result.setMsg("회원가입 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

    public ResultDto signin(UserDto user){
        ResultDto result = new ResultDto();
        try{
            UserEntity userEntity = UserMapper.mapper.userDtoToEntity(user);
            Optional<UserEntity> userInfo = userRepository.findByIdAndPwd(userEntity.getId(), userEntity.getPwd());
            if(!userInfo.isEmpty()){
                result.setMsg("로그인 성공");
                result.setSuccess(true);
                result.setDetail(userInfo);
            }
            else{
                result.setMsg("잘못된 아이디 또는 비밀번호");
                result.setDetail(user);
            }
        }
        catch(Exception e){
            result.setMsg("로그인 실패");
            result.setDetail(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }
}
