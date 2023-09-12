import { registerAs } from '@nestjs/config';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from '../dto/brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '../entities/brand.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import PDFDocument from 'pdfkit';
import 'pdfkit-table';

import { join } from 'path';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  async create(data: CreateBrandDto) {
    try {
      const countOfExistingBrands = await this.brandRepo.count();

      let dynamicCode;

      if (data.code) {
        dynamicCode = `MARCA-${String(data.code).padStart(8, '0')}`;
      } else {
        dynamicCode = this.generateDynamicCode(countOfExistingBrands + 1);
      }

      const newBrand = this.brandRepo.create({
        ...data,
        code: dynamicCode,
      });

      return await this.brandRepo.save(newBrand);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  generateDynamicCode(count: number) {
    const prefix = 'MARCA';
    const formattedCount = String(count).padStart(5, '0');
    return `${prefix}-${formattedCount}`;
  }

  async findAll(): Promise<Brand[]> {
    try {
      const brand = await this.brandRepo.find({
        order: {
          name: 'ASC',
        },
      });
      if (brand.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return brand;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<Brand> {
    try {
      const brand: Brand = await this.brandRepo
        .createQueryBuilder('brands')
        .where({ id })
        .getOne();
      if (!brand) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return brand;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(id: string, body: UpdateBrandDto): Promise<UpdateResult> {
    try {
      const brand: UpdateResult = await this.brandRepo.update(id, body);
      if (brand.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return brand;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const brand: DeleteResult = await this.brandRepo.delete(id);
      if (brand.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar',
        });
      }
      return brand;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async obtenerMarcaPorId(id: string): Promise<Brand> {
    const marca = await this.brandRepo.findOne({ where: { id } });

    if (!marca) {
      throw new NotFoundException(`Marca con ID ${id} no encontrada`);
    }

    return marca;
  }

  async generatePDF(): Promise<Buffer> {
    const brands = await this.brandRepo.find();
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'letter',
        bufferPages: true,
        autoFirstPage: false,
        margin: 50,
      });

      let pageNumber = 0;

      doc.on('pageAdded', () => {
        pageNumber++;
        const bottom = doc.page.margins.bottom;
        if (pageNumber >= 0) {
          doc.image(
            join(process.cwd(), 'uploads/logo.png'),
            doc.page.width - 100,
            30,
            { fit: [55, 55], align: 'center' },
          );
          doc
            .moveTo(50, 55)
            .lineTo(doc.page.width - 50, 55)
            .stroke();
        }

        doc.page.margins.bottom = 0;
        doc.font('Helvetica').fontSize(14);
        doc.text(
          'Pág. ' + pageNumber,
          0.5 * (doc.page.width - 100),
          doc.page.height - 80,
          {
            width: 100,
            align: 'center',
            lineBreak: false,
          },
        );
        doc.page.margins.bottom = bottom;
      });

      doc.addPage();
      doc.text('', 50, 50);
      doc.fontSize(24);
      doc.moveDown();
      doc.font('Helvetica-Bold').fontSize(18);
      doc.text('Reporte de Marcas', {
        width: doc.page.width - 100,
        align: 'center',
      });
      doc.moveDown();

      const table = {
        headers: ['#', 'Nombre', 'Código', 'Fecha'],
      };

      const rowHeight = 20;

      function drawTableCell(text, x, y, width, height, isHeader = false) {
        if (isHeader) {
          doc.rect(x, y, width, height).fillAndStroke('#0B85FF', '#e9ecef');
          doc.fillColor('#FFFFFF');
        } else {
          doc.rect(x, y, width, height).stroke();
          doc.fillColor('#000000');
        }

        doc.fontSize(12).text(text, x + 5, y + 5, {
          width: width - 10,
          align: 'center',
          valign: 'center',
        });
      }
      function formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear().toString().slice(-2);
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
      }

      const totalHeaderWidth = table.headers.reduce(
        (acc, header) => acc + doc.widthOfString(header) + 10,
        0,
      );

      const scale = doc.page.width / totalHeaderWidth;

      const columnWidths = table.headers.map(
        (header) => (doc.widthOfString(header) + 10) * scale,
      );

      doc.font('Helvetica');
      const headerY = doc.y;
      table.headers.forEach((header, columnIndex) => {
        const x =
          columnIndex === 0
            ? 0
            : columnWidths
                .slice(0, columnIndex)
                .reduce((acc, width) => acc + width, 0);
        drawTableCell(
          header,
          x,
          headerY,
          columnWidths[columnIndex],
          rowHeight,
          true,
        );
      });

      brands.forEach((brand, rowIndex) => {
        const formattedDate = formatDate(brand.register.createdAt);
        const y = headerY + (rowIndex + 1) * rowHeight;
        const rowData = [rowIndex + 1, brand.code, brand.code, formattedDate];
        rowData.forEach((cellData, columnIndex) => {
          const x =
            columnIndex === 0
              ? 0
              : columnWidths
                  .slice(0, columnIndex)
                  .reduce((acc, width) => acc + width, 0);
          drawTableCell(
            cellData.toString(),
            x,
            y,
            columnWidths[columnIndex],
            rowHeight,
            columnIndex === 0,
          );
        });
      });

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
      doc.end();
    });

    return pdfBuffer;
  }
}
