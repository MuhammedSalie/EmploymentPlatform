"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ArchitectureDiagram() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">AWS Serverless Employment Platform Architecture</h1>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="data">Data Flow</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AWS Serverless Architecture Overview</CardTitle>
              <CardDescription>Complete serverless stack for the employment platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[500px] bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center p-6">
                <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
                  {/* Frontend */}
                  <div className="col-span-3 bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Client Layer</h3>
                    <div className="flex justify-between gap-4">
                      <div className="bg-white dark:bg-slate-700 rounded p-2 flex-1 text-center shadow-sm">
                        Next.js + AWS Amplify
                      </div>
                      <div className="bg-white dark:bg-slate-700 rounded p-2 flex-1 text-center shadow-sm">
                        CloudFront + S3
                      </div>
                    </div>
                  </div>

                  {/* API Layer */}
                  <div className="col-span-3 bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">API Layer</h3>
                    <div className="flex justify-between gap-4">
                      <div className="bg-white dark:bg-slate-700 rounded p-2 flex-1 text-center shadow-sm">
                        API Gateway
                      </div>
                      <div className="bg-white dark:bg-slate-700 rounded p-2 flex-1 text-center shadow-sm">
                        AppSync (GraphQL)
                      </div>
                    </div>
                  </div>

                  {/* Compute Layer */}
                  <div className="col-span-3 bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Compute Layer</h3>
                    <div className="flex justify-between gap-4">
                      <div className="bg-white dark:bg-slate-700 rounded p-2 flex-1 text-center shadow-sm">
                        Lambda Functions
                      </div>
                      <div className="bg-white dark:bg-slate-700 rounded p-2 flex-1 text-center shadow-sm">
                        Step Functions
                      </div>
                    </div>
                  </div>

                  {/* Data Layer */}
                  <div className="col-span-3 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Data Layer</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-slate-700 rounded p-2 text-center shadow-sm">DynamoDB</div>
                      <div className="bg-white dark:bg-slate-700 rounded p-2 text-center shadow-sm">ElastiCache</div>
                      <div className="bg-white dark:bg-slate-700 rounded p-2 text-center shadow-sm">S3 Storage</div>
                    </div>
                  </div>

                  {/* Cross-cutting concerns */}
                  <div className="col-span-3 bg-red-100 dark:bg-red-900 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Cross-cutting Concerns</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-slate-700 rounded p-2 text-center shadow-sm">Cognito</div>
                      <div className="bg-white dark:bg-slate-700 rounded p-2 text-center shadow-sm">EventBridge</div>
                      <div className="bg-white dark:bg-slate-700 rounded p-2 text-center shadow-sm">CloudWatch</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auth" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Flow</CardTitle>
              <CardDescription>Using Amazon Cognito for secure user authentication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[400px] bg-slate-100 dark:bg-slate-800 rounded-lg flex flex-col items-center justify-center p-6">
                <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
                  {/* User */}
                  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg w-full">
                    <div className="text-center font-semibold">Client Application</div>
                  </div>

                  <div className="h-8 border-l-2 border-dashed"></div>

                  {/* Cognito */}
                  <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg w-full">
                    <div className="text-center font-semibold">Amazon Cognito</div>
                    <div className="mt-2 text-sm text-center">User Pools & Identity Pools</div>
                  </div>

                  <div className="h-8 border-l-2 border-dashed"></div>

                  {/* APIs */}
                  <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg w-full grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="font-semibold">API Gateway</div>
                      <div className="mt-1 text-xs">REST Endpoints</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">AppSync</div>
                      <div className="mt-1 text-xs">GraphQL Endpoints</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Flow</CardTitle>
              <CardDescription>How data moves through the serverless architecture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[500px] bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center p-6">
                <div className="grid grid-cols-3 gap-8 w-full max-w-4xl">
                  {/* Client */}
                  <div className="col-span-3 bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                    <div className="text-center font-semibold mb-2">Client Application</div>
                    <div className="flex justify-around gap-4">
                      <div className="bg-white dark:bg-slate-700 rounded p-2 text-xs">Query/Mutation Requests</div>
                      <div className="bg-white dark:bg-slate-700 rounded p-2 text-xs">Subscriptions</div>
                      <div className="bg-white dark:bg-slate-700 rounded p-2 text-xs">File Uploads</div>
                    </div>
                  </div>

                  {/* API Layer */}
                  <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
                    <div className="text-center font-semibold">API Gateway</div>
                    <div className="mt-2 text-xs text-center">REST APIs</div>
                  </div>

                  <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
                    <div className="text-center font-semibold">AppSync</div>
                    <div className="mt-2 text-xs text-center">GraphQL API</div>
                  </div>

                  <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
                    <div className="text-center font-semibold">S3 Presigned URLs</div>
                    <div className="mt-2 text-xs text-center">File Operations</div>
                  </div>

                  {/* Compute Layer */}
                  <div className="col-span-3 bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                    <div className="text-center font-semibold mb-2">Lambda Functions</div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-slate-700 rounded p-2 text-xs text-center">API Resolvers</div>
                      <div className="bg-white dark:bg-slate-700 rounded p-2 text-xs text-center">Data Processing</div>
                      <div className="bg-white dark:bg-slate-700 rounded p-2 text-xs text-center">Event Handlers</div>
                    </div>
                  </div>

                  {/* Data Layer */}
                  <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
                    <div className="text-center font-semibold">DynamoDB</div>
                    <div className="mt-2 text-xs text-center">Main Database</div>
                  </div>

                  <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
                    <div className="text-center font-semibold">ElastiCache</div>
                    <div className="mt-2 text-xs text-center">Cache Layer</div>
                  </div>

                  <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
                    <div className="text-center font-semibold">S3</div>
                    <div className="mt-2 text-xs text-center">File Storage</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realtime" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Architecture</CardTitle>
              <CardDescription>How real-time updates are handled in the serverless architecture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[400px] bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center p-6">
                <div className="grid grid-cols-1 gap-8 w-full max-w-2xl">
                  {/* Client */}
                  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                    <div className="text-center font-semibold mb-2">Client Application</div>
                    <div className="bg-white dark:bg-slate-700 rounded p-2 text-center">GraphQL Subscriptions</div>
                  </div>

                  {/* AppSync */}
                  <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
                    <div className="text-center font-semibold mb-2">AWS AppSync</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-slate-700 rounded p-2 text-xs text-center">
                        WebSocket Connections
                      </div>
                      <div className="bg-white dark:bg-slate-700 rounded p-2 text-xs text-center">
                        Subscription Management
                      </div>
                    </div>
                  </div>

                  {/* Event Sources */}
                  <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                    <div className="text-center font-semibold mb-2">Event Sources</div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-slate-700 rounded p-2 text-xs text-center">DynamoDB Streams</div>
                      <div className="bg-white dark:bg-slate-700 rounded p-2 text-xs text-center">EventBridge</div>
                      <div className="bg-white dark:bg-slate-700 rounded p-2 text-xs text-center">Lambda Functions</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
