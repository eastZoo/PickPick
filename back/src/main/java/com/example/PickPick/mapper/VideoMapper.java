package com.example.PickPick.mapper;

import com.example.PickPick.domain.VideoEntity;
import com.example.PickPick.dto.VideoDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface VideoMapper {
    VideoMapper mapper = Mappers.getMapper(VideoMapper.class);

    VideoEntity videoDtoToEntity(VideoDto video);

    VideoDto videoEntityToDto(VideoEntity user);
}
