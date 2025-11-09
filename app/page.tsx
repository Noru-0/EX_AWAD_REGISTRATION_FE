import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/beautiful-nature-landscape-forest-mountains-clouds.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative max-w-md w-full">
        <Card className="bg-white/10 backdrop-blur-md border border-white/30 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-2">
              Welcome to Registration App
            </CardTitle>
            <CardDescription className="text-white/80">
              A secure user registration and authentication system
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              <p className="text-white/90">
                Get started by logging in to your account or creating a new one.
              </p>
              
              <div className="flex flex-col gap-3">
                <Link href="/login">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    size="lg"
                  >
                    Login to Your Account
                  </Button>
                </Link>
                
                <Link href="/register">
                  <Button 
                    variant="outline" 
                    className="w-full border-white/30 text-white hover:bg-white/10"
                    size="lg"
                  >
                    Create New Account
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/20">
              <div className="grid grid-cols-3 gap-4 text-center text-sm text-white/70">
                <div>
                  <div className="font-semibold">Secure</div>
                  <div>Password hashing</div>
                </div>
                <div>
                  <div className="font-semibold">Fast</div>
                  <div>React + Next.js</div>
                </div>
                <div>
                  <div className="font-semibold">Modern</div>
                  <div>Latest UI/UX</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
