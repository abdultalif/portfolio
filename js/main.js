const carousel = new bootstrap.Carousel('#carouselPortfolio')

document.querySelector('#contact-form').addEventListener("submit", function (event) {
    event.preventDefault();

    var nama = document.querySelector("#namaContact").value,
        email = document.querySelector("#emailContact").value,
        perusahaan = document.querySelector("#perusahaanContact").value,
        pesan = document.querySelector("#pesanContact").value;

    var msg = `Halo...%0APerkenalkan%20Nama%20Saya%20${nama}%C2%A0%20dari%20${perusahaan}.%0A${pesan}.%0A${email}.`;

    location.href = "https://api.whatsapp.com/send?phone=6289523006671&text=" + msg;
});

const Portfolio = document.getElementById('portfolioGrid');
Portfolio.innerHTML = '';
axios.get(window.location.origin + '/portfolio.json').then((response) => {
    for (var key in response.data) {
        Portfolio.innerHTML += `
            <div class="col-md-6 col-lg-4 mb-5">
                <div class="portfolio-item mx-auto" onclick="return getPortfolio('${key}')">
                    <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                        <div class="portfolio-item-caption-content text-center text-white">
                            <i class="fas fa-plus fa-3x"></i>
                        </div>
                    </div>
                    <img class="img-fluid" src="assets/img/portfolio/${key}/${response.data[key].images[0]}" alt="${response.data[key].title}" />
                </div>
            </div>
        `;
    }
});

let portfolioModal = new bootstrap.Modal(document.getElementById("portfolioModal"), {});

function getPortfolio(name) {
    axios.get(window.location.origin + '/portfolio.json').then((response) => {
        let portfolio = response.data[name];

        // Ubah data dari modal
        let modal = document.getElementById('portfolioModal');

        modal.querySelector('#portfolioDesc').innerHTML = portfolio.desc;
        modal.querySelector('#portfolioTitle').innerHTML = portfolio.title;
        modal.querySelector('#portfolioLabel').innerHTML = '<i class="fa fa-tag me-2"></i>' + portfolio.label;
        modal.querySelector('#portfolioLink').href = portfolio.link;

        // Loop for Tech
        const portfolioTech = modal.querySelector('#portfolioTech');
        portfolioTech.innerHTML = "";
        portfolio.tech.forEach(tech => {
            portfolioTech.innerHTML += `
                <li class="list-inline-item">
                    &bull;
                    ${tech}
                </li>`;
        });

        // Loop for portfolio Images
        const portfolioImages = modal.querySelector('#portfolioImages');
        const portfolioIndicators = modal.querySelector('#portfolioIndicators');
        portfolioImages.innerHTML = "";
        portfolioIndicators.innerHTML = "";
        portfolio.images.forEach((img, index) => {
            portfolioImages.innerHTML += `
                <div class="carousel-item ${index == 0 && 'active'}">
                    <img 
                        src="assets/img/portfolio/${name}/${img}" 
                        class="d-block w-100"
                        alt="${name}"
                    />
                </div>
            `;

            portfolioIndicators.innerHTML += `
                <button 
                    type="button" 
                    data-bs-target="#carouselPortfolio"
                    data-bs-slide-to="${index}" 
                    ${index == 0 && 'class="active"'}
                    aria-current="true"
                    aria-label="${name}"
                ></button>
            `;
        });

        // Tampilkan pop up
        portfolioModal.show();
    })
}


const certificationMenu = document.getElementById('certificationMenu');
certificationMenu.innerHTML = '';
axios.get(window.location.origin + '/certifications.json').then((response) => {
    for (var key in response.data) {
        certificationMenu.innerHTML += `
            <div class="col-md-6 col-lg-4 mb-5">
                <div class="certification-item mx-auto" onclick="return getCertification('${key}')">
                    <div class="certification-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                        <div class="certification-item-caption-content text-center text-white">
                            <i class="fas fa-plus fa-3x"></i>
                        </div>
                    </div>
                    <img class="img-fluid" src="assets/img/certifications/${key}/${response.data[key].images[0]}" alt="${response.data[key].title}" />
                </div>
            </div>
        `;
    }
});

let certificationModal = new bootstrap.Modal(document.getElementById("certificationModal"), {});

function getCertification(name) {
    axios.get(window.location.origin + '/certifications.json').then((response) => {
        let certification = response.data[name];

        // Update data in the modal
        let modal = document.getElementById('certificationModal');

        modal.querySelector('#certificationDesc').innerHTML = certification.desc;
        modal.querySelector('#certificationTitle').innerHTML = certification.title;
        modal.querySelector('#certificationLabel').innerHTML = '<i class="fa fa-tag me-2"></i>' + certification.label;
        modal.querySelector('#certificationLink').href = certification.link;


        // Loop for Tech
        const certificationTech = modal.querySelector('#certificationTech');
        certificationTech.innerHTML = "";
        certification.tech.forEach(tech => {
            certificationTech.innerHTML += `
                <li class="list-inline-item">
                    &bull;
                    ${tech}
                </li>`;
        });



        // Loop for Certification Images
        const certificationImages = modal.querySelector('#certificationImages');
        const certificationIndicators = modal.querySelector('#certificationIndicators');
        certificationImages.innerHTML = "";
        certificationIndicators.innerHTML = "";
        certification.images.forEach((img, index) => {
            certificationImages.innerHTML += `
                <div class="carousel-item ${index == 0 && 'active'}">
                    <img 
                        src="assets/img/certifications/${name}/${img}" 
                        class="d-block w-100"
                        alt="${name}"
                    />
                </div>
            `;

            certificationIndicators.innerHTML += `
                <button 
                    type="button" 
                    data-bs-target="#carouselCertification"
                    data-bs-slide-to="${index}" 
                    ${index == 0 && 'class="active"'}
                    aria-current="true"
                    aria-label="${name}"
                ></button>
            `;
        });

        // Show the modal
        certificationModal.show();
    })
}
