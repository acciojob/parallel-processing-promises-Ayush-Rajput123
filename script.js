const output = document.getElementById("output");
      const btn = document.getElementById("download-images-button");
      const loadingDiv = document.getElementById("loading");
      const errorDiv = document.getElementById("error");

      const images = [
        { url: "https://picsum.photos/id/237/200/300" },
        { url: "https://picsum.photos/id/238/200/300" },
        { url: "https://picsum.photos/id/239/200/300" },
      ];

      function downloadImage(url) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load: ${url}`));
        });
      }

      async function downloadImages() {
        output.innerHTML = "";
        errorDiv.textContent = "";
        loadingDiv.style.display = "block";

        try {
          const imgs = await Promise.all(images.map(i => downloadImage(i.url)));
          imgs.forEach(img => output.appendChild(img));
        } catch (err) {
          errorDiv.textContent = err.message;
        } finally {
          loadingDiv.style.display = "none";
        }
      }

      btn.addEventListener("click", downloadImages);
