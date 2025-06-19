"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Upload,
  Search,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Trash2,
  Edit,
  Download,
  FileAudio,
  Mic,
  Volume2,
  VolumeX,
  Plus,
  Settings,
  RefreshCw,
  BarChart2,
  FileText,
  AudioWaveformIcon as Waveform,
  ListFilter,
} from "lucide-react"

export default function AudioKnowledgePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentTab, setCurrentTab] = useState("library")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(80)
  const [selectedAudio, setSelectedAudio] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Sample data
  const audioFiles = [
    {
      id: 1,
      name: "customer_interview_001.mp3",
      duration: "12:34",
      size: "8.2 MB",
      date: "2023/06/15",
      status: "Processed",
      tags: ["Interview", "Customer", "Feedback"],
      transcription: true,
    },
    {
      id: 2,
      name: "meeting_recording_20230620.wav",
      duration: "45:12",
      size: "24.5 MB",
      date: "2023/06/20",
      status: "Processed",
      tags: ["Meeting", "Planning Dept", "Project A"],
      transcription: true,
    },
    {
      id: 3,
      name: "product_description_v2.mp3",
      duration: "05:45",
      size: "3.1 MB",
      date: "2023/06/25",
      status: "Processing",
      tags: ["Product", "Marketing"],
      transcription: false,
    },
    {
      id: 4,
      name: "training_audio_basics.mp3",
      duration: "32:18",
      size: "17.4 MB",
      date: "2023/07/01",
      status: "Pending",
      tags: ["Training", "Education"],
      transcription: false,
    },
    {
      id: 5,
      name: "customer_support_call_record.wav",
      duration: "08:52",
      size: "4.8 MB",
      date: "2023/07/05",
      status: "Processed",
      tags: ["Customer Support", "Inquiry"],
      transcription: true,
    },
  ]

  const recentAnalyses = [
    {
      id: 1,
      name: "customer_interview_001.mp3",
      type: "Sentiment Analysis",
      result: "Positive: 65%, Negative: 15%, Neutral: 20%",
      date: "2023/07/10",
    },
    {
      id: 2,
      name: "meeting_recording_20230620.wav",
      type: "Keyword Extraction",
      result: "Project, Budget, Schedule, Resources, Issues",
      date: "2023/07/08",
    },
    {
      id: 3,
      name: "customer_support_call_record.wav",
      type: "Speaker Identification",
      result: "Speaker 1: 45%, Speaker 2: 55%",
      date: "2023/07/07",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Processed
          </Badge>
        )
      case "Processing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Processing
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const handleSeek = (value: number[]) => {
    const seekTime = value[0]
    setCurrentTime(seekTime)
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const selectAudio = (id: number) => {
    setSelectedAudio(id === selectedAudio ? null : id)
    setIsPlaying(false)
    // Actual app would load the selected audio file here
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Audio Knowledge Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button variant="outline" size="sm">
            <Mic className="mr-2 h-4 w-4" />
            Record
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search audio files..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="processed">Processed</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="unprocessed">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      <Tabs defaultValue="library" onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="library">
            <FileAudio className="mr-2 h-4 w-4" />
            Library
          </TabsTrigger>
          <TabsTrigger value="analysis">
            <Waveform className="mr-2 h-4 w-4" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="transcription">
            <FileText className="mr-2 h-4 w-4" />
            Transcription
          </TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audio Library</CardTitle>
              <CardDescription>Manage uploaded audio files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">File Name</TableHead>
                      <TableHead>Length</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {audioFiles.map((file) => (
                      <TableRow
                        key={file.id}
                        className={selectedAudio === file.id ? "bg-muted/50" : ""}
                        onClick={() => selectAudio(file.id)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <FileAudio className="mr-2 h-4 w-4 text-muted-foreground" />
                            {file.name}
                          </div>
                        </TableCell>
                        <TableCell>{file.duration}</TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell>{file.date}</TableCell>
                        <TableCell>{getStatusBadge(file.status)}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {file.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                // Playback processing
                              }}
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                // Editing processing
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                // Deletion processing
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {selectedAudio && (
            <Card>
              <CardHeader>
                <CardTitle>Audio Player</CardTitle>
                <CardDescription>
                  {audioFiles.find((file) => file.id === selectedAudio)?.name || "Selected Audio File"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => {}}>
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button size="icon" onClick={handlePlayPause}>
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => {}}>
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{formatTime(currentTime)}</span>
                      <span className="text-sm">
                        {audioFiles.find((file) => file.id === selectedAudio)?.duration || "00:00"}
                      </span>
                    </div>
                    <Slider
                      value={[currentTime]}
                      min={0}
                      max={100} // Actual app would match the audio length
                      step={1}
                      onValueChange={handleSeek}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setVolume(volume > 0 ? 0 : 80)}>
                      {volume > 0 ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </Button>
                    <Slider
                      className="flex-1"
                      value={[volume]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={handleVolumeChange}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Select defaultValue="1">
                        <SelectTrigger className="w-[80px]">
                          <SelectValue placeholder="Speed" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0.5">0.5x</SelectItem>
                          <SelectItem value="0.75">0.75x</SelectItem>
                          <SelectItem value="1">1.0x</SelectItem>
                          <SelectItem value="1.25">1.25x</SelectItem>
                          <SelectItem value="1.5">1.5x</SelectItem>
                          <SelectItem value="2">2.0x</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-sm text-muted-foreground">Playback Speed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Transcribe
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Actual audio player (hidden) */}
                <audio
                  ref={audioRef}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  src="/sample-audio.mp3" // Actual app would set the selected audio file URL
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audio Analysis</CardTitle>
              <CardDescription>Analysis and insights from audio files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Sentiment Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">Positive</span>
                            <span className="text-xs font-medium">65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">Negative</span>
                            <span className="text-xs font-medium">15%</span>
                          </div>
                          <Progress value={15} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">Neutral</span>
                            <span className="text-xs font-medium">20%</span>
                          </div>
                          <Progress value={20} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Speaker Identification</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">Speaker 1 (Male)</span>
                            <span className="text-xs font-medium">45%</span>
                          </div>
                          <Progress value={45} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">Speaker 2 (Female)</span>
                            <span className="text-xs font-medium">55%</span>
                          </div>
                          <Progress value={55} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Keywords</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Project (12)</Badge>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Budget (8)</Badge>
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Schedule (7)</Badge>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Resources (5)</Badge>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Issues (4)</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Recent Analyses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>File Name</TableHead>
                          <TableHead>Analysis Type</TableHead>
                          <TableHead>Result</TableHead>
                          <TableHead>Analysis Date</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentAnalyses.map((analysis) => (
                          <TableRow key={analysis.id}>
                            <TableCell className="font-medium">{analysis.name}</TableCell>
                            <TableCell>{analysis.type}</TableCell>
                            <TableCell>{analysis.result}</TableCell>
                            <TableCell>{analysis.date}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon">
                                  <BarChart2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Run New Analysis
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="transcription" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transcription</CardTitle>
              <CardDescription>Manage transcriptions of audio files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="not-started">Not Started</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <ListFilter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Transcription
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">File Name</TableHead>
                        <TableHead>Length</TableHead>
                        <TableHead>Word Count</TableHead>
                        <TableHead>Accuracy</TableHead>
                        <TableHead>Created Date</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {audioFiles
                        .filter((file) => file.transcription)
                        .map((file) => (
                          <TableRow key={file.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                                {file.name.replace(/\.[^/.]+$/, ".txt")}
                              </div>
                            </TableCell>
                            <TableCell>{file.duration}</TableCell>
                            <TableCell>{Math.floor(Math.random() * 5000) + 1000}</TableCell>
                            <TableCell>{Math.floor(Math.random() * 20) + 80}%</TableCell>
                            <TableCell>{file.date}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>

                {selectedAudio && audioFiles.find((file) => file.id === selectedAudio)?.transcription && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Transcription Preview</CardTitle>
                      <CardDescription>
                        {audioFiles.find((file) => file.id === selectedAudio)?.name.replace(/\.[^/.]+$/, ".txt") ||
                          "Selected File"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border p-4 h-[200px] overflow-y-auto">
                        <p className="text-sm">[00:00:05] Speaker 1: Hello, I would like to start today's meeting.</p>
                        <p className="text-sm">
                          [00:00:10] Speaker 2: Yes, thank you. Let's discuss the new project today.
                        </p>
                        <p className="text-sm">
                          [00:00:18] Speaker 1: That's right. First, I would like to confirm the budget. What is the
                          current estimate?
                        </p>
                        <p className="text-sm">
                          [00:00:25] Speaker 2: The current estimate is about $50,000. However, this does not include
                          contingency funds.
                        </p>
                        <p className="text-sm">
                          [00:00:35] Speaker 1: I see. Then, how much should we budget as a contingency?
                        </p>
                        <p className="text-sm">
                          [00:00:42] Speaker 2: Usually, it's good to look at about 10-15% of the total. In this case,
                          it would be about $5,000 to $7,500.
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Switch id="auto-timestamps" />
                        <Label htmlFor="auto-timestamps">Show Timestamps</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Audio Processing Status</CardTitle>
            <CardDescription>Processing status of uploaded audio files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Processed</span>
                  <span className="text-sm font-medium">3/5</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-xs text-muted-foreground">Processed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-xs text-muted-foreground">Processing</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Process All
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audio Analysis Statistics</CardTitle>
            <CardDescription>Audio file analysis statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Audio Time</span>
                <span className="text-sm font-medium">1 hour 45 minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Audio Length</span>
                <span className="text-sm font-medium">21 minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Transcription Word Count</span>
                <span className="text-sm font-medium">12,450 words</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Transcription Accuracy</span>
                <span className="text-sm font-medium">92%</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <BarChart2 className="mr-2 h-4 w-4" />
              Detailed Report
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
