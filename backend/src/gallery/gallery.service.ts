import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GalleryImage } from './entities/gallery-image.entity';
import { UploadImageDto, UpdateGalleryImageDto } from './dto/upload-image.dto';
import { UploadService } from '../upload/upload.service';

// Tipos de arquivo permitidos para upload
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryImage)
    private readonly galleryRepository: Repository<GalleryImage>,
    private readonly uploadService: UploadService,
  ) {}

  /** Lista imagens ativas (rota pública) */
  async findActive(): Promise<GalleryImage[]> {
    return this.galleryRepository.find({
      where: { isActive: true },
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  /** Lista todas as imagens incluindo inativas (admin) */
  async findAll(): Promise<GalleryImage[]> {
    return this.galleryRepository.find({
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  /**
   * Faz upload de uma imagem para o Cloudinary e salva a referência no banco.
   * @param file - Arquivo recebido pelo Multer
   * @param dto - Metadados da imagem (título, categoria)
   */
  async uploadImage(
    file: Express.Multer.File,
    dto: UploadImageDto,
  ): Promise<GalleryImage> {
    // Valida o tipo do arquivo
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        'Tipo de arquivo não permitido. Use: JPG, PNG ou WebP',
      );
    }

    // Valida o tamanho do arquivo
    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException('Arquivo muito grande. Tamanho máximo: 5MB');
    }

    // Faz upload para o Cloudinary na pasta desiree/gallery
    const { url, publicId } = await this.uploadService.uploadToCloudinary(
      file.buffer,
      'desiree/gallery',
    );

    const image = this.galleryRepository.create({
      url,
      publicId,
      title: dto.title,
      category: dto.category || 'outros',
      order: dto.order || 0,
      isActive: true,
    });

    return this.galleryRepository.save(image);
  }

  async update(id: number, dto: UpdateGalleryImageDto): Promise<GalleryImage> {
    const image = await this.findOne(id);
    Object.assign(image, dto);
    return this.galleryRepository.save(image);
  }

  /**
   * Remove a imagem do Cloudinary E do banco de dados.
   */
  async remove(id: number): Promise<void> {
    const image = await this.findOne(id);

    // Remove do Cloudinary primeiro
    await this.uploadService.deleteFromCloudinary(image.publicId);

    // Depois remove do banco
    await this.galleryRepository.remove(image);
  }

  async toggle(id: number): Promise<GalleryImage> {
    const image = await this.findOne(id);
    image.isActive = !image.isActive;
    return this.galleryRepository.save(image);
  }

  private async findOne(id: number): Promise<GalleryImage> {
    const image = await this.galleryRepository.findOne({ where: { id } });
    if (!image) throw new NotFoundException(`Imagem #${id} não encontrada`);
    return image;
  }
}
