

export const CloudinaryImage = ({ publicId, alt = "", className = "" }) => {

    const baseUrl = 'https://res.cloudinary.com/dwhdla1b4/image/upload';
    const folder = 'v1749595725/pcp-images';
    const fallbackImage = `${baseUrl}/w_600,q_auto,f_auto/${folder}/logo_pcp_mppj0w.webp`;

    if(!publicId){
        return(
            <img 
                src={ fallbackImage }
                alt="logo pcp"
            />
        )
    }

    return (
        <img
            src={`${baseUrl}/w_600,q_auto,f_auto/${folder}/${publicId}`}
            srcSet={`
                ${baseUrl}/w_300,q_auto,f_auto/${folder}/${publicId} 300w,
                ${baseUrl}/w_600,q_auto,f_auto/${folder}/${publicId} 600w,
                ${baseUrl}/w_1000,q_auto,f_auto/${folder}/${publicId} 1000w,
                ${baseUrl}/w_1600,q_auto,f_auto/${folder}/${publicId} 1600w
            `}
            sizes="(max-width: 600px) 300px,
                    (max-width: 1024px) 600px,
                    (max-width: 1600px) 1000px,
                    1600px"
            alt={alt}
            loading="lazy"
            decoding="async" //permite que el navegador decodifique las imágenes sin bloquear el render del resto
            className={className}
            onError={(e) => {   
                e.target.onerror = null; // Evita bucle si falla fallback
                e.target.src = fallbackImage;
                e.target.srcset = ""; // Limpia srcSet para no intentar cargar tamaños fallidos
            }}
        />
    );
}
