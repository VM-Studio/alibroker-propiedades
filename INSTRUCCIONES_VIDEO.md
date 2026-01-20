# Cómo agregar el video al Hero

## Opción 1: Video alojado localmente

1. **Guardar el video en la carpeta `public`:**
   - Coloca tu video en `/public/video-propiedad.mp4`
   - Coloca el thumbnail en `/public/thumbnail-video.jpg`

2. **Editar el archivo `src/app/page.tsx`:**
   - Ve a la línea ~115 (sección del Hero)
   - Reemplaza el div placeholder por:

```tsx
<video
  controls
  poster="/thumbnail-video.jpg"
  className="w-full h-full object-cover"
>
  <source src="/video-propiedad.mp4" type="video/mp4" />
  Tu navegador no soporta videos HTML5.
</video>
```

## Opción 2: Video de YouTube o Vimeo

### Para YouTube:

```tsx
<iframe
  className="w-full h-full"
  src="https://www.youtube.com/embed/TU_ID_DE_VIDEO"
  title="Video de la propiedad"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
```

### Para Vimeo:

```tsx
<iframe
  className="w-full h-full"
  src="https://player.vimeo.com/video/TU_ID_DE_VIDEO"
  title="Video de la propiedad"
  allow="autoplay; fullscreen; picture-in-picture"
  allowFullScreen
></iframe>
```

## Opción 3: Video con reproducción automática (sin sonido)

```tsx
<video
  autoPlay
  muted
  loop
  playsInline
  poster="/thumbnail-video.jpg"
  className="w-full h-full object-cover"
>
  <source src="/video-propiedad.mp4" type="video/mp4" />
</video>
```

## Notas importantes:

- **Formatos recomendados:** MP4 (H.264)
- **Tamaño recomendado:** Máximo 50MB para carga rápida
- **Resolución recomendada:** 1920x1080 (Full HD)
- **Thumbnail:** JPG o PNG, 1920x1080 px

## Ubicación del código:

El placeholder del video está en:

- **Archivo:** `src/app/page.tsx`
- **Línea:** ~115-130
- **Sección:** Hero Section (Right Column - Video)
