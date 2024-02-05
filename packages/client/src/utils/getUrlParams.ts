export const getUrlParams = (param: string): string | null => {
  const urlParams = new URLSearchParams(window.location.href)

  return urlParams.get(param)
}
