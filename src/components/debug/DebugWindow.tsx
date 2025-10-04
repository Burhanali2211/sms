import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Trash2, Database, AlertTriangle, CheckCircle, Info, Table, Clipboard, Link } from 'lucide-react';
import { useDebug } from '@/contexts/DebugContext';
import { toast } from '@/hooks/use-toast';

const DebugWindow: React.FC = () => {
  const { 
    requests, 
    clearRequests, 
    isDebugWindowOpen, 
    setIsDebugWindowOpen,
    databaseSchema
  } = useDebug();
  const [activeTab, setActiveTab] = useState<'requests' | 'responses' | 'schema'>('requests');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard',
      description: 'Request/response data copied successfully'
    });
  };

  // New function to copy complete error details
  const copyErrorDetails = (request: any) => {
    const errorDetails = {
      timestamp: request.timestamp instanceof Date ? request.timestamp.toISOString() : request.timestamp,
      method: request.method,
      url: request.url,
      status: request.status,
      error: request.error,
      headers: request.headers,
      payload: request.payload,
      tableName: request.tableName,
      affectedFields: request.affectedFields,
      validationErrors: request.validationErrors,
      fieldConflicts: request.fieldConflicts,
      expectedFormat: request.expectedFormat,
      actualFormat: request.actualFormat,
      duration: request.duration
    };
    
    const errorReport = `
ERROR REPORT
============
Timestamp: ${errorDetails.timestamp}
Method: ${errorDetails.method}
URL: ${errorDetails.url}
Status: ${errorDetails.status}
Duration: ${errorDetails.duration}ms

ERROR MESSAGE
-------------
${errorDetails.error}

REQUEST HEADERS
---------------
${JSON.stringify(errorDetails.headers, null, 2)}

REQUEST PAYLOAD
---------------
${errorDetails.payload ? JSON.stringify(errorDetails.payload, null, 2) : 'No payload'}

DATABASE INTERACTION
--------------------
Table: ${errorDetails.tableName || 'N/A'}
Affected Fields: ${errorDetails.affectedFields?.join(', ') || 'N/A'}

VALIDATION ERRORS
-----------------
${errorDetails.validationErrors?.join('\n') || 'None'}

FIELD CONFLICTS
---------------
${errorDetails.fieldConflicts?.map(conflict => 
  `${conflict.field}: Expected ${conflict.expected}, but got ${conflict.actual}`
).join('\n') || 'None'}

FORMAT COMPARISON
-----------------
Expected: ${errorDetails.expectedFormat ? JSON.stringify(errorDetails.expectedFormat, null, 2) : 'N/A'}
Actual: ${errorDetails.actualFormat ? JSON.stringify(errorDetails.actualFormat, null, 2) : 'N/A'}

POSSIBLE SOLUTIONS
------------------
1. Check database connection and credentials
2. Verify request payload matches expected format
3. Ensure all required fields are provided
4. Check field data types match database schema
5. Review backend logs for additional details
    `.trim();
    
    navigator.clipboard.writeText(errorReport);
    toast({
      title: 'Error details copied',
      description: 'Complete error report copied to clipboard'
    });
  };

  const formatJson = (data: any) => {
    if (!data) return '';
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return typeof data === 'string' ? data : String(data);
    }
  };

  const getStatusColor = (status?: number) => {
    if (!status) return 'warning'; // Pending
    if (status >= 200 && status < 300) return 'success'; // Success
    if (status >= 400) return 'error'; // Error
    return 'info'; // Other
  };

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET': return 'info';
      case 'POST': return 'success';
      case 'PUT': return 'warning';
      case 'DELETE': return 'error';
      default: return 'secondary';
    }
  };

  // Helper function to safely format timestamp
  const formatTimestamp = (timestamp: Date | string) => {
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      return date.toLocaleTimeString();
    } catch (e) {
      return 'Invalid Date';
    }
  };

  // Find table schema by name
  const getTableSchema = (tableName?: string) => {
    if (!tableName) return null;
    return databaseSchema.find(table => table.name === tableName) || null;
  };

  // Format data for table display
  const formatDataForTable = (data: any) => {
    if (!data) return [];
    
    // If it's an array, use the first item as the template
    const item = Array.isArray(data) ? data[0] : data;
    
    if (typeof item === 'object' && item !== null) {
      return Object.entries(item).map(([key, value]) => ({
        field: key,
        value: typeof value === 'object' ? JSON.stringify(value) : String(value),
        type: typeof value
      }));
    }
    
    return [{ field: 'value', value: String(data), type: typeof data }];
  };

  // Copy database schema information
  const copyDatabaseSchema = () => {
    const schemaReport = databaseSchema.map(table => {
      return `
TABLE: ${table.name}
====================
FIELDS:
${table.fields.map(field => 
  `  ${field.name} (${field.type}) ${field.required ? 'REQUIRED' : 'OPTIONAL'}${field.constraints ? ` [${field.constraints.join(', ')}]` : ''}${field.description ? ` - ${field.description}` : ''}`
).join('\n')}

RELATIONSHIPS:
${table.relationships?.map(rel => 
  `  ${rel.type}: ${table.name} -> ${rel.relatedTable}${rel.foreignKey ? ` (via ${rel.foreignKey})` : ''}`
).join('\n') || '  None'}
      `.trim();
    }).join('\n\n');
    
    navigator.clipboard.writeText(schemaReport);
    toast({
      title: 'Database schema copied',
      description: 'Complete database schema copied to clipboard'
    });
  };

  return (
    <Dialog open={isDebugWindowOpen} onOpenChange={setIsDebugWindowOpen}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              API Inspector & Database Interaction
            </DialogTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearRequests}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          </div>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 overflow-hidden flex flex-col">
          <TabsList>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="responses">Responses & Database</TabsTrigger>
            <TabsTrigger value="schema">Database Schema</TabsTrigger>
          </TabsList>
          
          <div className="flex-1 overflow-auto mt-4">
            <TabsContent value="requests" className="h-full m-0">
              {requests.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No requests logged yet
                </div>
              ) : (
                <Accordion type="multiple" className="w-full">
                  {requests.map((request) => (
                    <AccordionItem key={request.id} value={request.id} className="border-b">
                      <AccordionTrigger className="hover:no-underline py-3 px-2">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <Badge variant={getMethodColor(request.method)}>
                              {request.method}
                            </Badge>
                            <span className="font-mono text-sm truncate max-w-md">
                              {request.url}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {request.status && (
                              <Badge variant={getStatusColor(request.status)}>
                                {request.status}
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(request.timestamp)}
                            </span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-3 bg-muted/50">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Headers</h4>
                            <pre className="text-xs bg-background p-2 rounded border overflow-auto max-h-32">
                              {formatJson(request.headers)}
                            </pre>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-2"
                              onClick={() => copyToClipboard(formatJson(request.headers))}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Headers
                            </Button>
                          </div>
                          
                          {request.payload && (
                            <div>
                              <h4 className="font-medium mb-2">Payload</h4>
                              <pre className="text-xs bg-background p-2 rounded border overflow-auto max-h-40">
                                {formatJson(request.payload)}
                              </pre>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="mt-2"
                                onClick={() => copyToClipboard(formatJson(request.payload))}
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Payload
                              </Button>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </TabsContent>
            
            <TabsContent value="responses" className="h-full m-0">
              {requests.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No responses logged yet
                </div>
              ) : (
                <Accordion type="multiple" className="w-full">
                  {requests.map((request) => (
                    <AccordionItem key={`response-${request.id}`} value={`response-${request.id}`} className="border-b">
                      <AccordionTrigger className="hover:no-underline py-3 px-2">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <Badge variant={getMethodColor(request.method)}>
                              {request.method}
                            </Badge>
                            <span className="font-mono text-sm truncate max-w-md">
                              {request.url}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {request.status ? (
                              <Badge variant={getStatusColor(request.status)}>
                                {request.status} {request.status >= 200 && request.status < 300 ? 'OK' : request.status >= 400 ? 'Error' : ''}
                              </Badge>
                            ) : (
                              <Badge variant="warning">Pending</Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(request.timestamp)}
                            </span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-3 bg-muted/50">
                        <div className="space-y-6">
                          {/* Response Data */}
                          {request.error ? (
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium text-red-500 flex items-center gap-2">
                                  <AlertTriangle className="h-4 w-4" />
                                  Error
                                </h4>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => copyErrorDetails(request)}
                                  className="flex items-center gap-2"
                                >
                                  <Clipboard className="h-4 w-4" />
                                  Copy Full Error Details
                                </Button>
                              </div>
                              <pre className="text-xs bg-red-50 p-2 rounded border overflow-auto max-h-40 text-red-800 dark:bg-red-950/20 dark:text-red-200">
                                {request.error}
                              </pre>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="mt-2"
                                onClick={() => copyToClipboard(request.error || '')}
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Error
                              </Button>
                            </div>
                          ) : request.response ? (
                            <div>
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Response
                              </h4>
                              <pre className="text-xs bg-background p-2 rounded border overflow-auto max-h-40">
                                {formatJson(request.response)}
                              </pre>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="mt-2"
                                onClick={() => copyToClipboard(formatJson(request.response))}
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Response
                              </Button>
                            </div>
                          ) : (
                            <div className="text-muted-foreground">
                              No response received yet
                            </div>
                          )}
                          
                          {/* Database Interaction Information */}
                          {(request.tableName || request.affectedFields || request.validationErrors || request.fieldConflicts) && (
                            <div className="border-t pt-4">
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Database className="h-4 w-4" />
                                Database Interaction
                              </h4>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Table Information */}
                                {request.tableName && (
                                  <div className="bg-background p-3 rounded border">
                                    <h5 className="font-medium mb-2 flex items-center gap-2">
                                      <Table className="h-4 w-4" />
                                      Affected Table: {request.tableName}
                                    </h5>
                                    
                                    {/* Show table schema if available */}
                                    {getTableSchema(request.tableName) && (
                                      <div className="mt-2">
                                        <h6 className="text-sm font-medium mb-1">Fields:</h6>
                                        <div className="flex flex-wrap gap-1">
                                          {getTableSchema(request.tableName)?.fields.slice(0, 5).map((field) => (
                                            <Badge key={field.name} variant="secondary" className="text-xs">
                                              {field.name}
                                            </Badge>
                                          ))}
                                          {getTableSchema(request.tableName)?.fields.length > 5 && (
                                            <Badge variant="secondary" className="text-xs">
                                              +{getTableSchema(request.tableName)?.fields.length - 5} more
                                            </Badge>
                                          )}
                                        </div>
                                        
                                        {/* Show relationships if available */}
                                        {getTableSchema(request.tableName)?.relationships && (
                                          <div className="mt-2">
                                            <h6 className="text-sm font-medium mb-1">Relationships:</h6>
                                            <div className="space-y-1">
                                              {getTableSchema(request.tableName)?.relationships?.slice(0, 3).map((rel, index) => (
                                                <div key={index} className="text-xs flex items-center gap-1">
                                                  <Link className="h-3 w-3" />
                                                  <span>{rel.type}: {request.tableName} → {rel.relatedTable}</span>
                                                </div>
                                              ))}
                                              {getTableSchema(request.tableName)?.relationships && getTableSchema(request.tableName)!.relationships!.length > 3 && (
                                                <div className="text-xs text-muted-foreground">
                                                  +{getTableSchema(request.tableName)!.relationships!.length - 3} more relationships
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                )}
                                
                                {/* Affected Fields */}
                                {request.affectedFields && request.affectedFields.length > 0 && (
                                  <div className="bg-background p-3 rounded border">
                                    <h5 className="font-medium mb-2">Affected Fields</h5>
                                    <div className="flex flex-wrap gap-1">
                                      {request.affectedFields.map((field) => (
                                        <Badge key={field} variant="outline" className="text-xs">
                                          {field}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                {/* Validation Errors */}
                                {request.validationErrors && request.validationErrors.length > 0 && (
                                  <div className="bg-red-50 p-3 rounded border md:col-span-2">
                                    <h5 className="font-medium mb-2 text-red-700 flex items-center gap-2">
                                      <AlertTriangle className="h-4 w-4" />
                                      Validation Errors
                                    </h5>
                                    <ul className="list-disc list-inside text-red-700 dark:text-red-300">
                                      {request.validationErrors.map((error, index) => (
                                        <li key={index} className="text-sm">{error}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                
                                {/* Field Conflicts */}
                                {request.fieldConflicts && request.fieldConflicts.length > 0 && (
                                  <div className="bg-amber-50 p-3 rounded border md:col-span-2">
                                    <h5 className="font-medium mb-2 text-amber-700 flex items-center gap-2">
                                      <Info className="h-4 w-4" />
                                      Field Type Conflicts
                                    </h5>
                                    <div className="space-y-2">
                                      {request.fieldConflicts.map((conflict, index) => (
                                        <div key={index} className="text-sm">
                                          <span className="font-medium">{conflict.field}</span>: 
                                          Expected <span className="font-mono">{conflict.expected}</span>, 
                                          but got <span className="font-mono text-amber-700">{conflict.actual}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {/* Response Data Table Format */}
                          {request.response && (
                            <div className="border-t pt-4">
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Table className="h-4 w-4" />
                                Response Data Format
                              </h4>
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b">
                                      <th className="text-left p-2">Field</th>
                                      <th className="text-left p-2">Value</th>
                                      <th className="text-left p-2">Type</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {formatDataForTable(request.response).map((item, index) => (
                                      <tr key={index} className="border-b">
                                        <td className="p-2 font-mono">{item.field}</td>
                                        <td className="p-2">
                                          <pre className="text-xs bg-muted p-1 rounded max-w-xs overflow-hidden">
                                            {item.value.length > 50 ? `${item.value.substring(0, 50)}...` : item.value}
                                          </pre>
                                        </td>
                                        <td className="p-2">
                                          <Badge variant="secondary" className="text-xs">
                                            {item.type}
                                          </Badge>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                          
                          {/* Expected vs Actual Format */}
                          {(request.expectedFormat || request.actualFormat) && (
                            <div className="border-t pt-4">
                              <h4 className="font-medium mb-3">Format Comparison</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {request.expectedFormat && (
                                  <div>
                                    <h5 className="font-medium mb-2">Expected Format</h5>
                                    <pre className="text-xs bg-background p-2 rounded border overflow-auto max-h-32">
                                      {formatJson(request.expectedFormat)}
                                    </pre>
                                  </div>
                                )}
                                {request.actualFormat && (
                                  <div>
                                    <h5 className="font-medium mb-2">Actual Format</h5>
                                    <pre className="text-xs bg-background p-2 rounded border overflow-auto max-h-32">
                                      {formatJson(request.actualFormat)}
                                    </pre>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </TabsContent>
            
            {/* Database Schema Tab */}
            <TabsContent value="schema" className="h-full m-0">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Database Schema</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyDatabaseSchema}
                  className="flex items-center gap-2"
                >
                  <Clipboard className="h-4 w-4" />
                  Copy All Schema
                </Button>
              </div>
              
              <div className="space-y-6 max-h-[60vh] overflow-y-auto">
                {databaseSchema.map((table) => (
                  <div key={table.name} className="border rounded-lg p-4 bg-background">
                    <div className="flex items-center gap-2 mb-3">
                      <Table className="h-5 w-5 text-blue-500" />
                      <h4 className="text-lg font-medium">{table.name}</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Fields</h5>
                        <div className="space-y-2">
                          {table.fields.map((field) => (
                            <div key={field.name} className="text-sm border-b pb-2">
                              <div className="flex justify-between">
                                <span className="font-mono">{field.name}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {field.type}
                                </Badge>
                              </div>
                              {field.required && (
                                <Badge variant="destructive" className="text-xs mt-1">
                                  REQUIRED
                                </Badge>
                              )}
                              {field.constraints && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {field.constraints.map((constraint, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {constraint}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              {field.description && (
                                <p className="text-muted-foreground text-xs mt-1">
                                  {field.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Relationships</h5>
                        {table.relationships && table.relationships.length > 0 ? (
                          <div className="space-y-2">
                            {table.relationships.map((rel, index) => (
                              <div key={index} className="text-sm border-b pb-2">
                                <div className="flex items-center gap-1">
                                  <Link className="h-4 w-4" />
                                  <span className="font-medium">{rel.type}</span>
                                </div>
                                <p className="text-muted-foreground text-xs">
                                  {table.name} → {rel.relatedTable}
                                  {rel.foreignKey && ` (via ${rel.foreignKey})`}
                                  {rel.joinTable && ` (through ${rel.joinTable})`}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm">No relationships defined</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DebugWindow;