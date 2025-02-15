export interface DCPluginConfig {
  allowed_content_types?: string;
  auth_methods?: string[];
  body_schema?: string;
  issuer?: string;
  key_names?: string[];
  parameter_schema?: string;
  scopes_required?: string[];
  verbose_response?: boolean;
  version?: 'draft4',
}

export interface DCPlugin {
  name: string;
  enabled?: boolean;
  tags?: string[];
  config?: DCPluginConfig;
}

export interface DCRoute {
  methods: string[];
  // eslint-disable-next-line camelcase -- this is defined by a spec that is out of our control
  strip_path: boolean;
  tags: string[];
  name: string;
  paths: string[];
  plugins?: DCPlugin[];
}

export interface DCService {
  name: string;
  protocol: string;
  host: string;
  port: number;
  path: string;
  routes: DCRoute[];
  tags: string[];
  plugins?: DCPlugin[];
}

export interface DCTarget {
  target: string;
  tags?: string[];
}

export interface DCUpstream {
  name: string;
  tags: string[];
  targets: DCTarget[];
}

export interface DeclarativeConfig {
  _format_version: '1.1';
  services: DCService[];
  upstreams: DCUpstream[];
}
