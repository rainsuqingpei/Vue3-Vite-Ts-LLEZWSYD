export const require = (imgPath) => {
  try {
    const handlePath = imgPath.replace('@', '..');
    return new URL(handlePath, import.meta.url).href;
  } catch (error) {
    console.warn(error);
  }
}
// https://blog.csdn.net/juanjuan_159/article/details/135136991