'use client'

// import { useAuthContext } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Github, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  // const { user, loading, signInWithGoogle, signInWithGithub } = useAuthContext()
  // const router = useRouter()

  // useEffect(() => {
  //   if (user) {
  //     router.push('/quiz')
  //   }
  // }, [user, router])

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <Loader2 className="w-8 h-8 animate-spin" />
  //     </div>
  //   )
  // }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome to Edmod</CardTitle>
          <CardDescription>Sign in to start your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              // onClick={() => signInWithGoogle()}
            >
              <Image
                src="/google-logo.svg"
                width={20}
                height={20}
                alt="Google logo"
                className="mr-2"
              />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              // onClick={() => signInWithGithub()}
            >
              <Github className="mr-2 h-5 w-5" />
              Continue with GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

