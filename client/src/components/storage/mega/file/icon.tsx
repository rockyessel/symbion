import { Headphones, Image as ImageIcon, Paperclip, Video } from 'lucide-react';

interface Props {
  extension: string;
}

const FileIcon = ({ extension }: Props) => {
  switch (extension) {
    case 'video mp4':
    case 'video swf':
    case 'video mkv':
    case 'video flv':
    case 'video vob':
    case 'video avi':
    case 'video ogg':
    case 'video mpeg':
    case 'video rm':
    case 'video 3gp':
    case 'video m4v':
    case 'video 3g2':
    case 'video mov':
    case 'video mpg':
    case 'video asf':
    case 'video wmv':
    case 'video webm':
      return <Video strokeWidth={0.5} />;

    case 'audio mp3':
    case 'audio mpeg':
    case 'audio wma':
      return <Headphones strokeWidth={0.5} />;

    case 'image png':
    case 'image webp':
    case 'image jpg':
    case 'image jpeg':
    case 'image jfif':
    case 'image gif':
    case 'image svg':
      return <ImageIcon  strokeWidth={0.5} />;

    default:
      return <Paperclip strokeWidth={0.5} />;
  }
};

export default FileIcon;
