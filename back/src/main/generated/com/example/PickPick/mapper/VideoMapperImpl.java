package com.example.PickPick.mapper;

import com.example.PickPick.domain.VideoEntity;
import com.example.PickPick.dto.VideoDto;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-15T22:26:59+0900",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 15.0.1 (Oracle Corporation)"
)
public class VideoMapperImpl implements VideoMapper {

    @Override
    public VideoEntity videoDtoToEntity(VideoDto video) {
        if ( video == null ) {
            return null;
        }

        VideoEntity.VideoEntityBuilder videoEntity = VideoEntity.builder();

        videoEntity.id( video.getId() );
        videoEntity.url( video.getUrl() );
        videoEntity.categoryId( video.getCategoryId() );

        return videoEntity.build();
    }

    @Override
    public VideoDto videoEntityToDto(VideoEntity user) {
        if ( user == null ) {
            return null;
        }

        VideoDto.VideoDtoBuilder videoDto = VideoDto.builder();

        videoDto.id( user.getId() );
        videoDto.url( user.getUrl() );
        videoDto.categoryId( user.getCategoryId() );

        return videoDto.build();
    }
}
