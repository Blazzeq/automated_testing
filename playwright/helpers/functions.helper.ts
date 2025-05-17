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

export async function login(page, userData) {
  await page.goto('/');
  await page.getByTestId('login-input').fill(userData.login);
  await page.getByTestId('password-input').fill(userData.password);
  await page.getByTestId('login-button').click();
}
