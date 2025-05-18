export async function getElementType(locator) {
  const tagName = await locator.evaluate((el) => el.tagName.toLowerCase());
  if (tagName === 'input' || tagName === 'textarea') {
    return 'text';
  }
  if (tagName === 'select') {
    return 'select';
  }
  return 'other';
}
