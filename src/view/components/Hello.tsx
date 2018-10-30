import * as React from "react";

export interface HelloProps {
  compiler: string;
  framework: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
  public render() {
    return (
      <div>
        <h1>
          Hello world from {this.props.compiler} and {this.props.framework}!
        </h1>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/A71aqufiNtQ"
          allow="autoplay; encrypted-media"
        />
      </div>
    );
  }
}
