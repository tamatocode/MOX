"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import {
  Copy,
  Eye,
  EyeOff,
  Key,
  Code,
  Zap,
  Shield,
  Trash2,
  RefreshCw,
} from "lucide-react";

function Page() {
  const [showSecrets, setShowSecrets] = useState({});
  const [apiName, setApiName] = useState("");
  const [keys, setKeys] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState({});

  useEffect(() => {
    (async function fetchapiKeys() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/api-keys", {
          method: "GET",
        });
        const data = await response.json();
        setKeys(data.message || []);
      } catch (error) {
        console.log(error);
        setKeys([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const createApiSecret = async () => {
    try {
      setIsCreating(true);
      if (!apiName.trim()) return;

      const response = await fetch("/api/api-keys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: apiName,
        }),
      });

      if (response.ok) {
        // Refresh the keys list
        const fetchResponse = await fetch("/api/api-keys", {
          method: "GET",
        });
        const data = await fetchResponse.json();
        setKeys(data.message || []);
        setApiName("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreating(false);
    }
  };

  const toggleSecretVisibility = (secretId) => {
    setShowSecrets((prev) => ({
      ...prev,
      [secretId]: !prev[secretId],
    }));
  };

  const copyToClipboard = async (text, id, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess({ [id + type]: true });
      setTimeout(() => {
        setCopySuccess({});
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const maskSecret = (secret) => {
    if (!secret) return "";
    if (secret.length <= 12) return "•".repeat(secret.length);
    return (
      secret.substring(0, 8) +
      "•".repeat(secret.length - 12) +
      secret.substring(secret.length - 4)
    );
  };

  const deleteApiKey = async (keyId) => {
    try {
      const response = await fetch(`/api/api-keys/${keyId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setKeys(keys.filter((key) => key.id !== keyId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshKeys = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/api-keys", {
        method: "GET",
      });
      const data = await response.json();
      setKeys(data.message || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const codeSnippets = {
    javascript: `// Using native fetch API
const apiConfig = {
  baseURL: 'https://api.yourservice.com',
  headers: {
    'Authorization': 'Bearer YOUR_CLIENT_SECRET',
    'X-Client-ID': 'YOUR_CLIENT_ID',
    'Content-Type': 'application/json'
  }
};

// Example API call
const fetchData = async () => {
  try {
    const response = await fetch(\`\${https://recurx.com}/paymenthandler\`, {
      method: 'POST',
      body:{
      subscribitionid, clientid, clientSecret

      } 
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
      // In the response you will the redirect url of product checkout page
      // https://recurx.com/checkout/<your-subscription-plan-id>/<your-wallet-address>
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
  }
};`,

    curl: `# Basic API call with curl
curl -X GET "https://api.yourservice.com/data" \\
  -H "Authorization: Bearer YOUR_CLIENT_SECRET" \\
  -H "X-Client-ID: YOUR_CLIENT_ID" \\
  -H "Content-Type: application/json"

# POST request example
curl -X POST "https://api.yourservice.com/data" \\
  -H "Authorization: Bearer YOUR_CLIENT_SECRET" \\
  -H "X-Client-ID: YOUR_CLIENT_ID" \\
  -H "Content-Type: application/json" \\
  -d '{"key": "value"}'`,

    python: `# Install requests: pip install requests
import requests

headers = {
    'Authorization': 'Bearer YOUR_CLIENT_SECRET',
    'X-Client-ID': 'YOUR_CLIENT_ID',
    'Content-Type': 'application/json'
}

# Example API call
def fetch_data():
    try:
        response = requests.get(
            'https://api.yourservice.com/data',
            headers=headers
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f'API Error: {e}')
        return None

# Usage
data = fetch_data()
print(data)`,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Create New Secret Card */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Create New API Secret
            </CardTitle>
            <CardDescription>
              Generate secure API credentials for your applications
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label
                  htmlFor="apiName"
                  className="text-sm font-medium text-slate-700"
                >
                  API Name
                </Label>
                <Input
                  id="apiName"
                  placeholder="e.g., Production API, Development API"
                  value={apiName}
                  onChange={(e) => setApiName(e.target.value)}
                  className="mt-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && apiName.trim() && !isCreating) {
                      createApiSecret();
                    }
                  }}
                />
              </div>
              <Button
                onClick={createApiSecret}
                disabled={!apiName.trim() || isCreating}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isCreating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    Create Secret
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* API Keys Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Your API Keys
                </CardTitle>
                <CardDescription>
                  Manage your active API credentials
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={refreshKeys}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-slate-600">Loading API keys...</span>
                </div>
              </div>
            ) : keys && keys.length > 0 ? (
              <div className="space-y-4">
                {keys.map((apiKey, index) => (
                  <Card
                    key={apiKey.id || index}
                    className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* API Key Name */}
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                              <Key className="w-4 h-4 text-blue-600" />
                              {apiKey.key || `API Key ${index + 1}`}
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">
                              Created{" "}
                              {apiKey.createdAt
                                ? new Date(
                                    apiKey.createdAt
                                  ).toLocaleDateString()
                                : "Recently"}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800 border-green-200"
                            >
                              Active
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteApiKey(apiKey.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Client ID */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            Client ID
                          </Label>
                          <div className="flex items-center gap-2">
                            <Input
                              value={apiKey.clientId || "Not available"}
                              readOnly
                              className="font-mono text-sm bg-slate-50 border-slate-200"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(
                                  apiKey.clientId,
                                  apiKey.id,
                                  "clientId"
                                )
                              }
                              className="px-3 hover:bg-blue-50 hover:border-blue-300"
                              disabled={!apiKey.clientId}
                            >
                              <Copy
                                className={`w-4 h-4 ${
                                  copySuccess[apiKey.id + "clientId"]
                                    ? "text-green-600"
                                    : ""
                                }`}
                              />
                            </Button>
                          </div>
                        </div>

                        {/* Client Secret */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            Client Secret
                          </Label>
                          <div className="flex items-center gap-2">
                            <Input
                              type={
                                showSecrets[apiKey.id] ? "text" : "password"
                              }
                              value={
                                showSecrets[apiKey.id]
                                  ? apiKey.clientSecret || "Not available"
                                  : maskSecret(apiKey.clientSecret)
                              }
                              readOnly
                              className="font-mono text-sm bg-slate-50 border-slate-200"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleSecretVisibility(apiKey.id)}
                              className="px-3 hover:bg-slate-100"
                              disabled={!apiKey.clientSecret}
                            >
                              {showSecrets[apiKey.id] ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(
                                  apiKey.clientSecret,
                                  apiKey.id,
                                  "clientSecret"
                                )
                              }
                              className="px-3 hover:bg-blue-50 hover:border-blue-300"
                              disabled={!apiKey.clientSecret}
                            >
                              <Copy
                                className={`w-4 h-4 ${
                                  copySuccess[apiKey.id + "clientSecret"]
                                    ? "text-green-600"
                                    : ""
                                }`}
                              />
                            </Button>
                          </div>
                        </div>

                        {/* Success indicators */}
                        {(copySuccess[apiKey.id + "clientId"] ||
                          copySuccess[apiKey.id + "clientSecret"]) && (
                          <div className="text-sm text-green-600 bg-green-50 p-2 rounded-md border border-green-200">
                            ✓ Copied to clipboard!
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                  <Key className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  No API Keys Found
                </h3>
                <p className="text-slate-500 mb-4">
                  Create your first API key to get started with secure
                  authentication.
                </p>
                <Button
                  onClick={() => document.getElementById("apiName")?.focus()}
                  variant="outline"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  Create First API Key
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Integration Guide */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-600" />
              Integration Guide
            </CardTitle>
            <CardDescription>
              Code examples to integrate your API secrets
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Alert className="mb-6 border-amber-200 bg-amber-50">
              <Shield className="w-4 h-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Security Note:</strong> Never expose your client secret
                in client-side code. Always use environment variables and keep
                secrets server-side.
              </AlertDescription>
            </Alert>

            <Tabs defaultValue="javascript" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-100">
                <TabsTrigger
                  value="javascript"
                  className="data-[state=active]:bg-white"
                >
                  JavaScript
                </TabsTrigger>
              </TabsList>

              {Object.entries(codeSnippets).map(([lang, code]) => (
                <TabsContent key={lang} value={lang} className="mt-4">
                  <div className="relative group">
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border">
                      <code>{code}</code>
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(code, lang, "code")}
                      className="absolute top-2 right-2 bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Page;
