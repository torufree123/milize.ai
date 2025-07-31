"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    defaultModel: "gpt-4o",
    temperature: 0.7,
    maxTokens: 4096,
    topP: 1.0,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
    systemPrompt: "あなたは親切で知識豊富なAIアシスタントです。",
    enableStreaming: true,
    enableFunctionCalling: true,
  })

  const models = [
    // OpenAI
    { value: "gpt-4o", label: "GPT-4o", provider: "OpenAI" },
    { value: "gpt-4.5", label: "GPT-4.5", provider: "OpenAI" },
    { value: "gpt-4.1", label: "GPT-4.1", provider: "OpenAI" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo", provider: "OpenAI" },
    { value: "gpt-4", label: "GPT-4", provider: "OpenAI" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", provider: "OpenAI" },

    // Anthropic
    { value: "claude-3.5-sonnet", label: "Claude 3.5 Sonnet", provider: "Anthropic" },
    { value: "claude-3-opus", label: "Claude 3 Opus", provider: "Anthropic" },
    { value: "claude-3-sonnet", label: "Claude 3 Sonnet", provider: "Anthropic" },
    { value: "claude-3-haiku", label: "Claude 3 Haiku", provider: "Anthropic" },

    // Google
    { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro", provider: "Google" },
    { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash", provider: "Google" },
    { value: "gemini-pro", label: "Gemini Pro", provider: "Google" },

    // Groq
    { value: "groq-llama3-70b", label: "Llama3 70B", provider: "Groq" },
    { value: "groq-llama3-8b", label: "Llama3 8B", provider: "Groq" },
    { value: "groq-mixtral-8x7b", label: "Mixtral 8x7B", provider: "Groq" },

    // xAI
    { value: "grok-1.5", label: "Grok 1.5", provider: "xAI" },
    { value: "grok-1", label: "Grok 1", provider: "xAI" },

    // Mistral
    { value: "mistral-large-latest", label: "Mistral Large", provider: "Mistral" },
    { value: "mistral-small-latest", label: "Mistral Small", provider: "Mistral" },

    // Cohere
    { value: "command-r-plus", label: "Command R+", provider: "Cohere" },
    { value: "command-r", label: "Command R", provider: "Cohere" },

    // DeepSeek
    { value: "deepseek-chat", label: "DeepSeek Chat", provider: "DeepSeek" },
    { value: "deepseek-coder", label: "DeepSeek Coder", provider: "DeepSeek" },
  ]

  const providers = [...new Set(models.map((model) => model.provider))]

  const handleSave = () => {
    // 設定保存処理
    console.log("Settings saved:", settings)
    toast({
      title: "設定が保存されました",
      description: "新しいモデル設定が適用されます。",
    })
  }

  const handleReset = () => {
    // デフォルト設定にリセット
    setSettings({
      defaultModel: "gpt-4o",
      temperature: 0.7,
      maxTokens: 4096,
      topP: 1.0,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0,
      systemPrompt: "あなたは親切で知識豊富なAIアシスタントです。",
      enableStreaming: true,
      enableFunctionCalling: true,
    })
    toast({
      title: "設定がリセットされました",
      description: "すべての設定がデフォルト値に戻りました。",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">モデル設定</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            リセット
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            保存
          </Button>
        </div>
      </div>

      <Tabs defaultValue="models" className="space-y-6">
        <TabsList>
          <TabsTrigger value="models">モデル選択</TabsTrigger>
          <TabsTrigger value="parameters">パラメータ</TabsTrigger>
          <TabsTrigger value="prompts">プロンプト</TabsTrigger>
          <TabsTrigger value="advanced">詳細設定</TabsTrigger>
        </TabsList>

        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>デフォルトモデル</CardTitle>
              <CardDescription>エージェントやチャットで使用するデフォルトのAIモデルを選択してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="model">AIモデル</Label>
                <Select
                  value={settings.defaultModel}
                  onValueChange={(value) => setSettings({ ...settings, defaultModel: value })}
                >
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

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {providers.map((provider) => (
                  <Card key={provider}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{provider}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {models
                        .filter((m) => m.provider === provider)
                        .map((model) => (
                          <div key={model.value} className="flex items-center justify-between">
                            <span className="text-sm">{model.label}</span>
                            <Button
                              variant={settings.defaultModel === model.value ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSettings({ ...settings, defaultModel: model.value })}
                            >
                              {settings.defaultModel === model.value ? "選択中" : "選択"}
                            </Button>
                          </div>
                        ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parameters">
          <Card>
            <CardHeader>
              <CardTitle>モデルパラメータ</CardTitle>
              <CardDescription>AIモデルの動作を調整するパラメータを設定してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Temperature</Label>
                  <span className="text-sm font-medium">{settings.temperature}</span>
                </div>
                <Slider
                  value={[settings.temperature]}
                  min={0}
                  max={2}
                  step={0.1}
                  onValueChange={(value) => setSettings({ ...settings, temperature: value[0] })}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>決定的</span>
                  <span>創造的</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>最大トークン数</Label>
                  <span className="text-sm font-medium">{settings.maxTokens}</span>
                </div>
                <Slider
                  value={[settings.maxTokens]}
                  min={1024}
                  max={32768}
                  step={1024}
                  onValueChange={(value) => setSettings({ ...settings, maxTokens: value[0] })}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Top P</Label>
                  <span className="text-sm font-medium">{settings.topP}</span>
                </div>
                <Slider
                  value={[settings.topP]}
                  min={0}
                  max={1}
                  step={0.1}
                  onValueChange={(value) => setSettings({ ...settings, topP: value[0] })}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Frequency Penalty</Label>
                  <span className="text-sm font-medium">{settings.frequencyPenalty}</span>
                </div>
                <Slider
                  value={[settings.frequencyPenalty]}
                  min={-2}
                  max={2}
                  step={0.1}
                  onValueChange={(value) => setSettings({ ...settings, frequencyPenalty: value[0] })}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Presence Penalty</Label>
                  <span className="text-sm font-medium">{settings.presencePenalty}</span>
                </div>
                <Slider
                  value={[settings.presencePenalty]}
                  min={-2}
                  max={2}
                  step={0.1}
                  onValueChange={(value) => setSettings({ ...settings, presencePenalty: value[0] })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompts">
          <Card>
            <CardHeader>
              <CardTitle>システムプロンプト</CardTitle>
              <CardDescription>AIの動作を制御する共通のシステムプロンプトを設定してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-prompt">デフォルトシステムプロンプト</Label>
                <Textarea
                  id="system-prompt"
                  placeholder="システムプロンプトを入力してください..."
                  className="min-h-32"
                  value={settings.systemPrompt}
                  onChange={(e) => setSettings({ ...settings, systemPrompt: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  テンプレートを使用
                </Button>
                <Button variant="outline" size="sm">
                  プレビュー
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>詳細設定</CardTitle>
              <CardDescription>高度な機能とオプションを設定してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>ストリーミング</Label>
                  <div className="text-sm text-muted-foreground">リアルタイムでレスポンスを表示</div>
                </div>
                <Switch
                  checked={settings.enableStreaming}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableStreaming: checked })}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Function Calling</Label>
                  <div className="text-sm text-muted-foreground">AIが外部ツールを使用可能にする</div>
                </div>
                <Switch
                  checked={settings.enableFunctionCalling}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableFunctionCalling: checked })}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="api-timeout">APIタイムアウト (秒)</Label>
                <Input id="api-timeout" type="number" placeholder="30" defaultValue="30" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retry-count">リトライ回数</Label>
                <Input id="retry-count" type="number" placeholder="3" defaultValue="3" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
