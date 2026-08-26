import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class VideosService {
  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
  }

  findAll() {
    return `This action returns all videos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
