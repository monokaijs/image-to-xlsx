Below is an example README you can use for your project:

---

# Image to XLSX Converter

This React application allows users to convert an image into an Excel (XLSX) file, where each cell's background color corresponds to a pixel's color from the image. The app includes options for grayscale conversion and image resizing—while preserving the image's original aspect ratio—by specifying a target height.

## Features

- **Image to XLSX Conversion:** Transform any uploaded image into an Excel file with colored cells that represent the original pixels.
- **Grayscale Option:** Optionally convert the image to grayscale before conversion.
- **Resize Option:** Optionally resize the image to a user-defined target height while automatically preserving the aspect ratio.
- **User-Controlled Conversion:** A dedicated **Convert** button lets the user decide when to begin the conversion process.

## Technologies Used

- **React** – For building the user interface.
- **ExcelJS** – For creating and formatting the Excel (XLSX) file.
- **FileSaver** – To trigger file downloads in the browser.
- **Canvas API** – For drawing the image and extracting pixel data.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/monokaijs/image-to-xlsx.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd image-to-xlsx
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

## Running the Application

Start the development server with:

```bash
npm start
```

This will launch the application in your default browser at [http://localhost:5173](http://localhost:5173).

## Usage

1. **Select an Image:**  
   Click the file input to select an image from your computer.

2. **Choose Options:**
    - **Grayscale:** Check the **Grayscale** checkbox to convert the image to grayscale.
    - **Resize:** Check the **Resize** checkbox to enable resizing. When enabled, enter a target height (in pixels). The image width is automatically calculated to preserve the aspect ratio.

3. **Convert:**  
   Click the **Convert** button when you're ready. The app will process the image based on your options, generate an XLSX file where each cell's background color corresponds to the image pixel color, and then automatically download the file as `converted-image.xlsx`.

## Code Structure

- **`ExportExcel.tsx`**  
  The main React component that handles image upload, user option selection, image processing (including optional grayscale and resizing), and XLSX file generation.

- **`App.tsx`**  
  The primary application component that renders the `ImageToXlsxConverter` component.

- **Dependencies:**
    - `exceljs` for Excel file generation.
    - `file-saver` for triggering file downloads.

## Notes

- **Performance:**  
  Converting very large images may result in huge Excel files and impact performance. It is recommended to use smaller images or enable resizing to reduce the output size.

- **Excel Appearance:**  
  The application sets a fixed column width and row height (e.g., width: 3, height: 15) to achieve a roughly square appearance for each cell. You might need to tweak these values depending on your requirements.

- **Browser Compatibility:**  
  This project requires a modern browser that supports HTML5 Canvas and ES6+ JavaScript features.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

If you have any questions or feedback, please feel free to reach out!

Happy converting!
