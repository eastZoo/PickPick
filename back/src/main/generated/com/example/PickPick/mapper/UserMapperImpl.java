package com.example.PickPick.mapper;

import com.example.PickPick.domain.UserEntity;
import com.example.PickPick.dto.UserDto;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-28T15:38:25+0900",
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
        userEntity.nickName( user.getNickName() );
        userEntity.imgUrl( user.getImgUrl() );

        return userEntity.build();
    }

    @Override
    public UserDto userEntityToDto(UserEntity user) {
        if ( user == null ) {
            return null;
        }

        UserDto.UserDtoBuilder userDto = UserDto.builder();

        userDto.id( user.getId() );
        userDto.nickName( user.getNickName() );
        userDto.imgUrl( user.getImgUrl() );

        return userDto.build();
    }
}
