import { useState } from "react";
import { marked } from "marked";
import { FaCompressAlt, FaExpandArrowsAlt } from "react-icons/fa";
import defaultMarkdown from "./defaultMarkdown.md?raw";

export default function App() {
  const [editorMaximize, setEditorMaximize] = useState(false);
  const [previewerMaximize, setPreviewerMaximize] = useState(false);

  // State untuk menyimpan teks yang diketik di editor
  const [editorText, setEditorText] = useState(defaultMarkdown);

  // Konfigurasi marked.js untuk fitur line break opsional
  // Optional Bonus: interprets carriage returns and renders them as br (line break)
  marked.setOptions({
    breaks: true, // Mengaktifkan fitur line break
    gfm: true, // Mengaktifkan GitHub Flavored Markdown (penting untuk code block)
  });

  // Fungsi untuk mengonversi Markdown ke HTML
  // Perhatikan penggunaan dangerouslySetInnerHTML untuk merender HTML dari string
  const getMarkdownText = () => {
    //Menggunakan marked() untuk konversi
    const rawMarkup = marked(editorText);
    return {
      __html: rawMarkup,
    };
  };

  // Handler untuk memperbarui state saat pengguna mengetik
  const handleChange = (event) => {
    setEditorText(event.target.value);
  };

  const handleClickEditor = () => {
    setEditorMaximize((prev) => !prev);
  };

  const handleClickPreviewer = () => {
    setPreviewerMaximize((prev) => !prev);
  };

  // Kita langsung menggunakan defaultMarkdown sebagai nilai awal state

  return (
    <div className="markdown-app">
      {/* EDITOR */}
      <div className={`editor-container ${previewerMaximize ? "close" : ""}`}>
        <h2 className="toolbar">
          Editor{" "}
          {!editorMaximize ? (
            <FaExpandArrowsAlt onClick={handleClickEditor} className="icon" />
          ) : (
            <FaCompressAlt onClick={handleClickEditor} className="icon" />
          )}
        </h2>
        <textarea
          id="editor"
          value={editorText} // Nilai default dimuat dari state
          onChange={handleChange}
          rows={editorMaximize ? 30 : 6}
        />
      </div>

      {/* PREVIEWER */}
      <div
        className={`preview-container ${editorMaximize ? "close" : ""} 
        `}
      >
        <h2 className="toolbar">
          Preview{" "}
          {!previewerMaximize ? (
            <FaExpandArrowsAlt
              onClick={handleClickPreviewer}
              className="icon"
            />
          ) : (
            <FaCompressAlt onClick={handleClickPreviewer} className="icon" />
          )}
        </h2>
        <div
          id="preview"
          // Digunakan untuk merender string HTML yang dihasilkan oleh marked()
          dangerouslySetInnerHTML={getMarkdownText()}
        />
      </div>
    </div>
  );
}
