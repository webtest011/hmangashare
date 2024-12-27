document.addEventListener('DOMContentLoaded', async () => {
    const pagesContainer = document.getElementById('pages');
    const jsonPath = './pages.json'; // Đường dẫn tới JSON chứa danh sách trang
    const assetsPath = './assets/'; // Thư mục chứa ảnh

    // Lấy danh sách trang từ pages.json
    async function fetchMangaPages() {
        try {
            const response = await fetch(jsonPath);
            if (!response.ok) throw new Error('Không thể tải pages.json');
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    // Hiển thị các trang truyện
    async function renderMangaPages() {
        const pages = await fetchMangaPages();

        if (pages.length === 0) {
            pagesContainer.innerHTML = '<p>Không tìm thấy trang nào.</p>';
            return;
        }

        // Hiển thị từng trang
        pages.forEach((fileName) => {
            const img = document.createElement('img');
            img.src = `${assetsPath}${fileName}`;
            img.alt = 'Trang truyện';
            img.loading = 'lazy';
            img.style.display = 'block';
            img.style.marginBottom = '10px'; // Khoảng cách giữa các trang
            pagesContainer.appendChild(img);
        });
    }

    await renderMangaPages();
});
