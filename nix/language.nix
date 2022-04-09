let
  pkgs = import ./pkgs.nix {};
in
  {
    js = rec {
      version = "16_x";
      pkgman = pkgs.yarn.override {nodejs = runtime;};
      runtime = pkgs.${"nodejs-${version}"};
      # awscli for bin/deps.sh
      deps = [ pkgs.awscli2 ];
    };
  }
