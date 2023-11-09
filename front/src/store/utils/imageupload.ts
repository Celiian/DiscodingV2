import axios from "axios";

export async function uploadImage(selectedFile: any) {
  try {
    const formData = new FormData();

    for (let i = 0; i < selectedFile.length; i++) {
      formData.append("images", selectedFile[i]);
    }

    try {
      const response = await axios.post("https://upload.42.money/upload", formData);

      return response.data.files;
    } catch (error) {}
  } catch (error) {
    console.error("Error displaying image:", error);
  }
}
