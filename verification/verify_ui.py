from playwright.sync_api import sync_playwright

def verify_ui_style():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Navigate to the home page (app/[slug] requires a slug, but let's try root or a random slug to see layout)
            # Since root page.tsx wasn't explicitly created in my plan (only app/[slug]), I should try a slug.
            # But wait, app/page.tsx existed in the original file list.
            # Let's check app/page.tsx content first? No, I'll just try /test-slug

            response = page.goto("http://localhost:3000/test-campaign", timeout=10000)

            # Wait for content to load
            page.wait_for_selector('body')

            # Take screenshot of the campaign page to verify background and font
            page.screenshot(path="verification/ui_style.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_ui_style()
