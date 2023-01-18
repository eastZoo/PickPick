package com.example.PickPick.mapper;

import com.example.PickPick.dto.UserDto;
import com.example.PickPick.domain.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper mapper = Mappers.getMapper(UserMapper.class);

    UserEntity userDtoToEntity(UserDto user);

    UserDto userEntityToDto(UserEntity user);
}