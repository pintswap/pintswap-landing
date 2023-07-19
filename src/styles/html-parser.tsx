export const formatDomNode = (
  domNode: React.ReactElement<any, any | React.JSXElementConstructor<any>>
) => {
  switch (domNode.type) {
    case 'h3': {
      return <h3 className="text-xl">{domNode.props.children[0]}</h3>;
    }
    case 'a': {
      const link: string = domNode.props?.children[0];
      if (link.includes('medium') && link.includes('media')) {
        return <></>;
      }
      return domNode;
    }
    case 'ol': {
      return (
        <ol className="list-disc pl-6">
          {domNode?.props.children.map((el: any, i: number) => (
            <li key={`blog-ol-${i}-${domNode?.key}`}>{el}</li>
          ))}
        </ol>
      );
    }
    default:
      return domNode;
  }
};
