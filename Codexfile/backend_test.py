import requests
import sys
from datetime import datetime
import json

class InstagramAPITester:
    def __init__(self, base_url="https://feed-preview-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failures = []

    def run_test(self, name, method, endpoint, expected_status, data=None, expected_count=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            response_data = {}
            
            if response.status_code in [200, 201]:
                try:
                    response_data = response.json()
                except:
                    response_data = {}
            
            if success:
                # Additional validation for expected count
                if expected_count is not None:
                    if isinstance(response_data, list):
                        actual_count = len(response_data)
                    elif isinstance(response_data, dict) and 'images' in response_data:
                        actual_count = len(response_data['images'])
                    else:
                        actual_count = 0
                        
                    if actual_count != expected_count:
                        success = False
                        print(f"❌ Count mismatch - Expected {expected_count}, got {actual_count}")
                        self.failures.append(f"{name}: Expected {expected_count} items, got {actual_count}")
                    else:
                        print(f"✅ Passed - Status: {response.status_code}, Count: {actual_count}")
                else:
                    print(f"✅ Passed - Status: {response.status_code}")
                    
                if success:
                    self.tests_passed += 1
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text[:200]}")
                self.failures.append(f"{name}: HTTP {response.status_code} instead of {expected_status}")

            return success, response_data

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failures.append(f"{name}: {str(e)}")
            return False, {}

    def test_basic_endpoints(self):
        """Test all basic GET endpoints with expected counts"""
        print("=== Testing Basic GET Endpoints ===")
        
        # Test posts endpoint (expecting 6 posts)
        self.run_test("GET Posts", "GET", "posts", 200, expected_count=6)
        
        # Test stories endpoint (expecting 6 stories)
        self.run_test("GET Stories", "GET", "stories", 200, expected_count=6)
        
        # Test explore endpoint (expecting 12 images)
        success, data = self.run_test("GET Explore", "GET", "explore", 200)
        if success and 'images' in data:
            if len(data['images']) == 12:
                print("✅ Explore images count correct (12)")
            else:
                print(f"❌ Explore images count wrong - Expected 12, got {len(data['images'])}")
                self.failures.append(f"Explore: Expected 12 images, got {len(data['images'])}")
        
        # Test reels endpoint (expecting 6 reels)
        self.run_test("GET Reels", "GET", "reels", 200, expected_count=6)
        
        # Test profile endpoint
        success, profile_data = self.run_test("GET Profile", "GET", "profile", 200)
        if success and profile_data:
            if 'username' in profile_data and 'posts' in profile_data:
                print("✅ Profile structure valid")
            else:
                print("❌ Profile missing required fields")
                self.failures.append("Profile: Missing username or posts field")

    def test_post_interactions(self):
        """Test like and save functionality"""
        print("\n=== Testing Post Interactions ===")
        
        # First get a post to interact with
        success, posts = self.run_test("GET Posts for Interaction", "GET", "posts", 200)
        if not success or not posts:
            print("❌ Cannot test interactions - no posts available")
            return
            
        post_id = posts[0]['id']
        print(f"Using post ID: {post_id}")
        
        # Test like toggle
        success, like_data = self.run_test("Toggle Like", "POST", f"posts/{post_id}/like", 200)
        if success and 'is_liked' in like_data:
            print(f"✅ Like toggle working - is_liked: {like_data['is_liked']}")
        else:
            self.failures.append("Like toggle: Missing is_liked in response")
            
        # Test save toggle  
        success, save_data = self.run_test("Toggle Save", "POST", f"posts/{post_id}/save", 200)
        if success and 'is_saved' in save_data:
            print(f"✅ Save toggle working - is_saved: {save_data['is_saved']}")
        else:
            self.failures.append("Save toggle: Missing is_saved in response")

    def test_individual_post(self):
        """Test getting individual post"""
        print("\n=== Testing Individual Post Access ===")
        
        # Get posts first to get a valid ID
        success, posts = self.run_test("GET Posts for Individual Test", "GET", "posts", 200)
        if success and posts:
            post_id = posts[0]['id']
            self.run_test("GET Individual Post", "GET", f"posts/{post_id}", 200)
            
            # Test invalid post ID
            self.run_test("GET Invalid Post", "GET", "posts/invalid_id", 404)

    def run_all_tests(self):
        """Run all test suites"""
        print("🚀 Starting Instagram API Tests")
        print(f"Backend URL: {self.api_url}")
        
        self.test_basic_endpoints()
        self.test_post_interactions() 
        self.test_individual_post()
        
        # Print results
        print(f"\n📊 Test Results")
        print(f"Tests passed: {self.tests_passed}/{self.tests_run}")
        print(f"Success rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.failures:
            print(f"\n❌ Failures ({len(self.failures)}):")
            for failure in self.failures:
                print(f"  - {failure}")
        
        return self.tests_passed == self.tests_run

def main():
    tester = InstagramAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())