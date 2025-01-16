import { cn } from "@/lib/utils"
import { Bot, User } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface MessageProps {
  content: string
  isBot?: boolean
  timestamp?: string
  options?: string[]
  onSelectOption?: (option: string) => void
  isCorrect?: boolean | null
}

export function Message({ 
  content, 
  isBot = false, 
  timestamp = new Date().toLocaleTimeString(), 
  options,
  onSelectOption,
  isCorrect
}: MessageProps) {
  return (
    <div className={cn(
      "flex w-full gap-4 p-4",
      !isBot && "flex-row-reverse"
    )}>
      <div className={cn(
        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border",
        isBot ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>
      <div className="flex flex-col gap-2 w-full max-w-[calc(100%-3rem)]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {isBot ? "Quiz Bot" : "You"}
          </span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <div className="grid gap-2">
          <p className="text-sm text-muted-foreground">{content}</p>
          {options && (
            <div className="grid gap-2 mt-2">
              {options.map((option) => (
                <Button
                  key={option}
                  variant="outline"
                  className="justify-start text-left h-auto py-4 px-4"
                  onClick={() => onSelectOption?.(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}
          {isCorrect !== null && !isBot && (
            <div className={cn(
              "text-sm mt-2",
              isCorrect ? "text-green-500" : "text-red-500"
            )}>
              {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

