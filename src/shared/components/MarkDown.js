import React from "react";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import remarkMath from "remark-math";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from "rehype-raw"
import "./MarkDown.css";
import "github-markdown-css"
const MarkDown = props => {

  
  return (
    <ReactMarkdown rehypePlugins = {[rehypeRaw]} className = {`markdown-body ${props.cName} markdown`} remarkPlugins={[gfm, remarkMath]} children = {props.markdown} components={{
      code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, '')}
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }
    }}/>
  )
} 

export default MarkDown;