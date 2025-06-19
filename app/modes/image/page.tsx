"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  ImageIcon,
  Upload,
  Download,
  Settings,
  Wand2,
  Copy,
  Trash2,
  RefreshCw,
  Palette,
  Layers,
  Zap,
  Sparkles,
} from "lucide-react"

export default function ImageModePage() {
  const [selectedTab, setSelectedTab] = useState("generate")
  const [prompt, setPrompt] = useState("")
  const [negativePrompt, setNegativePrompt] = useState("")
  const [selectedModel, setSelectedModel] = useState("dall-e-3")
  const [imageSize, setImageSize] = useState("1024x1024")
  const [imageStyle, setImageStyle] = useState("natural")
  const [quality, setQuality] = useState("standard")
  const [steps, setSteps] = useState([30])
  const [cfgScale, setCfgScale] = useState([7])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)

  const models = [
    { value: "dall-e-3", label: "DALL-E 3", provider: "OpenAI" },
    { value: "dall-e-2", label: "DALL-E 2", provider: "OpenAI" },
    { value: "midjourney", label: "Midjourney", provider: "Midjourney" },
    { value: "stable-diffusion", label: "Stable Diffusion", provider: "Stability AI" },
    { value: "firefly", label: "Adobe Firefly", provider: "Adobe" },
  ]

  const imageSizes = [
    { value: "1024x1024", label: "1024×1024 (Square)" },
    { value: "1024x1792", label: "1024×1792 (Portrait)" },
    { value: "1792x1024", label: "1792×1024 (Landscape)" },
    { value: "512x512", label: "512×512 (Small Square)" },
  ]

  const styles = [
    { value: "natural", label: "Natural" },
    { value: "vivid", label: "Vivid" },
    { value: "artistic", label: "Artistic" },
    { value: "photographic", label: "Photographic" },
    { value: "digital-art", label: "Digital Art" },
    { value: "oil-painting", label: "Oil Painting" },
    { value: "watercolor", label: "Watercolor" },
    { value: "sketch", label: "Sketch" },
  ]

  const generatedImages = [
    {
      id: 1,
      url: "/placeholder.svg?height=300&width=300&text=Generated+Image+1",
      prompt: "A futuristic cityscape at sunset with flying cars",
      model: "DALL-E 3",
      size: "1024x1024",
      timestamp: "2023/12/20 14:30",
    },
    {
      id: 2,
      url: "/placeholder.svg?height=300&width=300&text=Generated+Image+2",
      prompt: "A serene mountain landscape with a crystal clear lake",
      model: "Stable Diffusion",
      size: "1792x1024",
      timestamp: "2023/12/20 13:45",
    },
    {
      id: 3,
      url: "/placeholder.svg?height=300&width=300&text=Generated+Image+3",
      prompt: "Abstract geometric patterns in vibrant colors",
      model: "Midjourney",
      size: "1024x1024",
      timestamp: "2023/12/20 12:15",
    },
    {
      id: 4,
      url: "/placeholder.svg?height=300&width=300&text=Generated+Image+4",
      prompt: "A cozy coffee shop interior with warm lighting",
      model: "DALL-E 3",
      size: "1024x1792",
      timestamp: "2023/12/20 11:20",
    },
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate image generation process
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleUpscale = (imageId: number) => {
    console.log(`Upscaling image ${imageId}`)
  }

  const handleVariation = (imageId: number) => {
    console.log(`Creating variation of image ${imageId}`)
  }

  const handleDownload = (imageId: number) => {
    console.log(`Downloading image ${imageId}`)
  }

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Image Generation</h1>
          <p className="text-muted-foreground">Create stunning images with AI-powered generation</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate">
            <Wand2 className="mr-2 h-4 w-4" />
            Generate
          </TabsTrigger>
          <TabsTrigger value="gallery">
            <ImageIcon className="mr-2 h-4 w-4" />
            Gallery
          </TabsTrigger>
          <TabsTrigger value="edit">
            <Palette className="mr-2 h-4 w-4" />
            Edit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Generation Settings */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Generation Settings</CardTitle>
                  <CardDescription>Configure your image generation parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>AI Model</Label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {models.map((model) => (
                          <SelectItem key={model.value} value={model.value}>
                            <div className="flex items-center justify-between w-full">
                              <span>{model.label}</span>
                              <span className="text-xs text-muted-foreground ml-2">{model.provider}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Image Size</Label>
                    <Select value={imageSize} onValueChange={setImageSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {imageSizes.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Style</Label>
                    <Select value={imageStyle} onValueChange={setImageStyle}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {styles.map((style) => (
                          <SelectItem key={style.value} value={style.value}>
                            {style.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Quality</Label>
                    <Select value={quality} onValueChange={setQuality}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="hd">HD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedModel === "stable-diffusion" && (
                    <>
                      <div className="space-y-2">
                        <Label>Steps: {steps[0]}</Label>
                        <Slider value={steps} onValueChange={setSteps} min={10} max={50} step={1} />
                      </div>

                      <div className="space-y-2">
                        <Label>CFG Scale: {cfgScale[0]}</Label>
                        <Slider value={cfgScale} onValueChange={setCfgScale} min={1} max={20} step={0.5} />
                      </div>
                    </>
                  )}

                  <div className="flex items-center space-x-2">
                    <Switch id="enhance" />
                    <Label htmlFor="enhance">Enhance Quality</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Prompts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      "A futuristic cityscape at sunset",
                      "Abstract geometric patterns",
                      "Serene mountain landscape",
                      "Cozy coffee shop interior",
                      "Vibrant underwater scene",
                    ].map((quickPrompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left h-auto p-2"
                        onClick={() => setPrompt(quickPrompt)}
                      >
                        <span className="text-xs">{quickPrompt}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Prompt Input and Generation */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prompt</CardTitle>
                  <CardDescription>Describe the image you want to generate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Positive Prompt</Label>
                    <Textarea
                      placeholder="Describe what you want to see in the image..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Negative Prompt (Optional)</Label>
                    <Textarea
                      placeholder="Describe what you don't want to see..."
                      value={negativePrompt}
                      onChange={(e) => setNegativePrompt(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>

                  <Button onClick={handleGenerate} disabled={!prompt.trim() || isGenerating} className="w-full">
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Image
                      </>
                    )}
                  </Button>

                  {isGenerating && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Generation Progress</span>
                        <span>{generationProgress}%</span>
                      </div>
                      <Progress value={generationProgress} />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Generated Image Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Generated Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    {isGenerating ? (
                      <div className="text-center">
                        <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Generating your image...</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Your generated image will appear here</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Image Gallery</CardTitle>
              <CardDescription>Your generated images</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {generatedImages.map((image) => (
                  <Card key={image.id} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.prompt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="text-xs">
                          {image.model}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <p className="text-sm font-medium line-clamp-2 mb-2">{image.prompt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span>{image.size}</span>
                        <span>{image.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleCopyPrompt(image.prompt)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleVariation(image.id)}
                        >
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleUpscale(image.id)}>
                          <Zap className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDownload(image.id)}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Image Editing</CardTitle>
              <CardDescription>Edit and enhance your images with AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Layers className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Image editing features coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
