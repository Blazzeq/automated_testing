from selenium import webdriver

edge_options = webdriver.EdgeOptions()
edge_options.add_argument("--window-size=1920,1080")
edge_options.add_experimental_option("detach", True)
browser = webdriver.Edge(edge_options)

browser.get("https://demobank.jaktestowac.pl/logowanie_prod.html")
title = browser.title
print(title)
assert title == 'Demobank - Strona główna - Logowanie'
assert 'Demobank' in browser.title
browser.quit()