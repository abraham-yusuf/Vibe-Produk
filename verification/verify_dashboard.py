from playwright.sync_api import sync_playwright

def verify_dashboard():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1280, 'height': 800}
        )
        page = context.new_page()
        try:
            # We must set a cookie to bypass the middleware redirect for /dashboard
            # Since I'm mocking Supabase, I can just set a dummy cookie if the middleware checks for existence,
            # OR I need to disable the middleware protection for verification.
            # Looking at middleware.ts: `const { data: { user } } = await supabase.auth.getUser()`
            # With mock Supabase key, getUser() will likely fail or return null.
            # The middleware redirects to /login if user is null.

            # Since I cannot easily mock the auth state in the middleware without a real Supabase instance or mocking the library,
            # I will temporarily disable the redirect in middleware.ts or I can try to access the page and see if it redirects.

            # Let's try accessing /dashboard first.
            response = page.goto("http://localhost:3000/dashboard", timeout=10000)

            # If redirected to /login, we won't see the dashboard.
            # Let's check where we are.
            print(f"Current URL: {page.url}")

            if "login" in page.url:
                 print("Redirected to login. Middleware is protecting the route.")
                 # To verify the UI, I need to render the dashboard.
                 # I will temporarily modify middleware to allow access or just rely on the redirect proof that it works?
                 # User asked for "Admin Dashboard with CRUD". I need to verify the UI.
                 pass

            # Force navigate to see if we can render it (if middleware allows or if we disable it)
            # Actually, I'll assume for now I should verify the UI structure.
            # I'll create a verification script that expects to see the dashboard,
            # but if it fails due to auth, I'll know I need to bypass it.

            page.screenshot(path="verification/dashboard_attempt.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_dashboard()
