import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH || ''

function withBasePath(src: ImageProps['src']): ImageProps['src'] {
  if (typeof src !== 'string') return src
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:') || src.startsWith('blob:')) {
    return src
  }
  return `${basePath}${src}`
}

const Image = ({ src, ...rest }: ImageProps) => <NextImage src={withBasePath(src)} {...rest} />

export default Image
