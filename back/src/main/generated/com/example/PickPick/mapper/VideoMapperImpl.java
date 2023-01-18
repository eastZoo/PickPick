package com.example.PickPick.mapper;

import com.example.PickPick.domain.VideoEntity;
import com.example.PickPick.dto.VideoDto;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-01-16T13:35:21+0900",
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

        return videoEntity.build();
    }

    @Override
    public VideoDto videoEntityToDto(VideoEntity video) {
        if ( video == null ) {
            return null;
        }

        VideoDto.VideoDtoBuilder videoDto = VideoDto.builder();

        videoDto.id( video.getId() );
        videoDto.url( video.getUrl() );

        return videoDto.build();
    }
}
