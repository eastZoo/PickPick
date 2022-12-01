package com.example.PickPick.mapper;

import com.example.PickPick.domain.UserEntity;
import com.example.PickPick.dto.UserDto;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-28T13:34:34+0900",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 15.0.1 (Oracle Corporation)"
)
public class UserMapperImpl implements UserMapper {

    @Override
    public UserEntity userDtoToEntity(UserDto user) {
        if ( user == null ) {
            return null;
        }

        UserEntity.UserEntityBuilder userEntity = UserEntity.builder();

        userEntity.id( user.getId() );
        userEntity.pwd( user.getPwd() );
        userEntity.nickName( user.getNickName() );
        userEntity.img( user.getImg() );
        userEntity.role( user.getRole() );

        return userEntity.build();
    }

    @Override
    public UserDto userEntityToDto(UserEntity user) {
        if ( user == null ) {
            return null;
        }

        UserDto.UserDtoBuilder userDto = UserDto.builder();

        userDto.id( user.getId() );
        userDto.pwd( user.getPwd() );
        userDto.nickName( user.getNickName() );
        userDto.img( user.getImg() );
        userDto.role( user.getRole() );

        return userDto.build();
    }
}
