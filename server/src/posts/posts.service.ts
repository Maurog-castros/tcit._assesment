import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService implements OnModuleInit {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async onModuleInit() {
    const count = await this.postsRepository.count();
    if (count === 0) {
      console.log('Seeding initial data...');
      await this.postsRepository.save([
        { name: 'POST 1', description: 'Hola como están' },
        { name: 'POST 2', description: 'Hola como estánsss' },
        { name: 'POST 3', description: 'Hola como estánsss' },
        { name: 'POST 4', description: 'Hola como estánsss' },
        { name: 'POST 5', description: 'Hola como estánsss' },
      ]);
    }
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create(createPostDto);
    return await this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: number): Promise<Post> {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return await this.postsRepository.remove(post);
  }
}
