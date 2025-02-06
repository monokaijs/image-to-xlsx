import React, { useState } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const ImageToXlsxConverter = () => {
  const [file, setFile] = useState(null);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [shouldResize, setShouldResize] = useState(false);
  const [targetHeight, setTargetHeight] = useState(100);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleGrayscaleChange = (e) => {
    setIsGrayscale(e.target.checked);
  };

  const handleResizeChange = (e) => {
    setShouldResize(e.target.checked);
  };

  const handleHeightChange = (e) => {
    setTargetHeight(parseInt(e.target.value, 10) || 0);
  };

  const handleConvert = () => {
    if (!file) {
      alert('Please select an image file first.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let canvas, width, height, ctx;

        if (shouldResize && targetHeight > 0) {
          height = targetHeight;
          width = Math.round(img.width * (targetHeight / img.height));
          canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
        } else {
          width = img.width;
          height = img.height;
          canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
        }
        const imageData = ctx.getImageData(0, 0, width, height);
        const pixels = imageData.data;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Image');

        const columns = [];
        for (let col = 0; col < width; col++) {
          columns.push({ width: 3 });
        }
        worksheet.columns = columns;

        // Process every pixel row by row
        for (let y = 0; y < height; y++) {
          const row = worksheet.getRow(y + 1);
          row.height = 15;

          for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            let r = pixels[index];
            let g = pixels[index + 1];
            let b = pixels[index + 2];
            const a = pixels[index + 3];

            if (isGrayscale) {
              const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
              r = gray;
              g = gray;
              b = gray;
            }

            const alphaHex = a.toString(16).padStart(2, '0').toUpperCase();
            const rHex = r.toString(16).padStart(2, '0').toUpperCase();
            const gHex = g.toString(16).padStart(2, '0').toUpperCase();
            const bHex = b.toString(16).padStart(2, '0').toUpperCase();
            const argb = alphaHex + rHex + gHex + bHex;

            const cell = row.getCell(x + 1);
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb }
            };
          }
          row.commit();
        }

        workbook.xlsx.writeBuffer().then((buffer) => {
          const blob = new Blob(
            [buffer],
            { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
          );
          saveAs(blob, 'converted-image.xlsx');
        });
      };
      img.src = event.target.result as any;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2>Convert Image to XLSX</h2>
      <div style={{ padding: '16px 0' }}>
        <a href="https://github.com/monokaijs/image-to-xlsx">
          Source on GitHub
        </a>
        <span style={{padding: '0 8px'}}>|</span>
        <a href="https://nhan.ltd">
          Author
        </a>
      </div>
      <div>
        <label>
          <strong>Select Image:</strong>{' '}
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>
      <div style={{ marginTop: '8px' }}>
        <label>
          <input
            type="checkbox"
            checked={isGrayscale}
            onChange={handleGrayscaleChange}
          />
          Grayscale
        </label>
      </div>
      <div style={{ marginTop: '8px' }}>
        <label>
          <input
            type="checkbox"
            checked={shouldResize}
            onChange={handleResizeChange}
          />
          Resize
        </label>
      </div>
      {shouldResize && (
        <div style={{ marginTop: '8px' }}>
          <label>
            Target Height (px):{' '}
            <input
              type="number"
              value={targetHeight}
              onChange={handleHeightChange}
              style={{ width: '80px', marginLeft: '8px' }}
            />
          </label>
        </div>
      )}
      <div style={{ marginTop: '16px' }}>
        <button onClick={handleConvert}>Convert</button>
      </div>
    </div>
  );
};

export default ImageToXlsxConverter;
