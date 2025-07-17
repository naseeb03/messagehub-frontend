"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ExternalLink, Shield } from "lucide-react"

interface ConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  service: {
    name: string
    icon: any
    color: string
    permissions: string[]
  }
  onConnect: () => void
}

export function ConnectionModal({ isOpen, onClose, service, onConnect }: ConnectionModalProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    onConnect()
    setIsConnecting(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg text-white ${service.color}`}>
              <service.icon className="h-5 w-5" />
            </div>
            <DialogTitle>Connect to {service.name}</DialogTitle>
          </div>
          <DialogDescription>You'll be redirected to {service.name} to authorize this connection.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Permissions */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-blue-500" />
              <h4 className="font-medium">Permissions</h4>
            </div>
            <div className="space-y-2">
              {service.permissions.map((permission) => (
                <div key={permission} className="flex items-center gap-2 text-sm">
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                  {permission}
                </div>
              ))}
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </Label>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConnect} disabled={!acceptedTerms || isConnecting}>
            {isConnecting ? (
              "Connecting..."
            ) : (
              <>
                <ExternalLink className="h-4 w-4 mr-2" />
                Connect
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
