type UrlType = 'video' | 'image' | 'youtube';

export function getMediaUrlType(url: string): UrlType {
  if (url.match(/\.(jpeg|jpg|gif|png)$/)) {
    return 'image';
  }
  if (url.match(/\.(mp4|m4v|mov|flv)$/)) {
    return 'video';
  }
  if (
    url.match(
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
    )
  ) {
    return 'youtube';
  }

  return null;
}

export function getYoutubeVideoId(url: string): string {
  const p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) {
    return url.match(p)[1];
  }
  return null;
}
