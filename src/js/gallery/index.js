class Gallery{    
    /**
     * Crea la galeria de imagenes
     */
    createGallery(){
        const gallery = document.querySelector('.gallery-images');
        
        for(let i = 1; i <= 12; i++){
            const picture = this.#addPicture('thumb', i)
            picture.onclick = () => this.#modalImage(i);
            gallery.appendChild(picture);
        }
    }

    /**
     * Agrega cada una de las imagenes
     * 
     * @param {String} size 
     * @param {Number} id 
     * @returns 
     */
    #addPicture(size, id){
        const picture = document.createElement('picture');
        const srcImage = `public/assets/img/${size}/${id}`;
        const firstSource = this.#createElement('source', {'srcset': `${srcImage}.avif`, 'type': 'image/avif'});
        const secondSource = this.#createElement('source', {'srcset': `${srcImage}.webp`, 'type': 'image/webp'});
        const image = this.#createElement('img', {'src':`${srcImage}.jpg`, 'loading': 'lazy', 'width': '200', 'height': '300', 'alt': `Imagen ${id} festival`});

        picture.appendChild(firstSource);
        picture.appendChild(secondSource);
        picture.appendChild(image);

        return picture;
    }
    
    /**
     * Crea un elemto html y le asigna los atributos
     * 
     * @param {String} elementName Nombre del elemento
     * @param {Object} attribute atributos del objeto
     * @returns 
     */
    #createElement(elementName, attribute){
        const element = document.createElement(elementName);
    
        for(let key in attribute){
            element.setAttribute(key, attribute[key])
        }
    
        return element;
    }

    /**
     * Crea una ventana modal para mostrar las imagenes
     * @param {Number} id 
     */
    #modalImage(id){
        const body = document.querySelector('body');
        const overlay = document.createElement('div');
        const picture = this.#addPicture('grande', id)
        const closeModal = document.createElement('p');

        /**
         * Boton para cerrar el modal
         */
        closeModal.textContent = 'X';
        closeModal.classList.add('btn-close'); 
        closeModal.onclick = () => this.#closeModal(body, overlay);
        
        /**
         * Crea el overlay con la imagen
         */
        overlay.appendChild(picture);
        overlay.appendChild(closeModal);
        overlay.classList.add('overlay');
        overlay.onclick = () => this.#closeModal(body, overlay);

        /**
         * Lo añade al html
         */
        body.classList.add('fixed-body');
        body.appendChild(overlay);
    }

    /**
     * Cierra el modal
     * 
     * @param {Object} body 
     * @param {Object} modal 
     */
    #closeModal(body, modal){
        body.classList.remove('fixed-body');
        modal.remove();
    }
}

export default Gallery;