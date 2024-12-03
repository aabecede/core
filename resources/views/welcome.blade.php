<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta id="core-client-config" data-module="mta" data-controller="MtaHomeController" data-controllerid="home"
        data-method="navigation"
        data-core="
      eyJhcHAiOiJhZG1pbiIsImNvbnRyb2xsZXIiOiJtIiwibWV0aG9kIjoieCIsImJhc2V1cmwiOiJodHRw
      OlwvXC9waHBcL2NvcmVcL2luZGV4LnBocFwvYWRtaW5cLyIsImJhc2VmaWxldXJsIjoiaHR0cDpcL1wv
      cGhwXC9jb3JlXC9hZG1pblwvIiwiYXNzZXR1cmwiOiJodHRwOlwvXC9waHBcL2NvcmVcL2FkbWluXC9h
      c3NldFwvIiwic2Vzc2lkIjoib2UzajZzN2tlYjEyY2twczVjaTl2bGZsM20ifQ==">
    <link rel="stylesheet" href="http://php/core/.asset/vendor/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://php/core/.asset/vendor/bootstrap-icons/font/bootstrap-icons.css">
    <link rel="stylesheet" href="http://php/core/admin/asset/css/portal.css">
    <link rel="icon" href="favicon.ico">
    <link href='https://fonts.googleapis.com/css?family=Fira+Sans' rel='stylesheet'>
    <title>Home &rsaquo; Navigation</title>
</head>

<body>
    <header class="app-header fixed-top">
        <div class="app-header-inner">
            <div class="container-fluid py-2">
                <div class="app-header-content">
                    <div class="row justify-content-between align-items-center">

                        <div class="col-auto">
                            <a id="sidepanel-toggler" class="sidepanel-toggler d-inline-block d-xl-none" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                    viewBox="0 0 30 30" role="img">
                                    <title>Menu</title>
                                    <path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10"
                                        stroke-width="2" d="M4 7h22M4 15h22M4 23h22"></path>
                                </svg>
                            </a>
                        </div>
                        <!--//col-->
                        <div class="search-mobile-trigger d-sm-none col">
                            <i class="search-mobile-trigger-icon fas fa-search"></i>
                        </div>
                        <!--//col-->
                        <div class="app-search-box col">
                            <form class="app-search-form">
                                <input type="text" placeholder="Search..." name="search"
                                    class="form-control search-input">
                                <button type="submit" class="btn search-btn btn-primary" value="Search"><i
                                        class="fas fa-search"></i></button>
                            </form>
                        </div>
                        <!--//app-search-box-->

                        <div class="app-utilities col-auto d-flex align-items-center">
                            <div class="app-utility-item app-notifications-dropdown dropdown">
                                <a class="dropdown-toggle no-toggle-arrow" id="notifications-dropdown-toggle"
                                    data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"
                                    title="Notifications">
                                    <i class="bi bi-bell icon"></i>
                                    <!-- <span class="icon-badge">3</span> -->
                                </a>
                                <!--//dropdown-toggle-->

                                <div class="dropdown-menu p-0" aria-labelledby="notifications-dropdown-toggle">
                                    <div class="dropdown-menu-header p-3">
                                        <h5 class="dropdown-menu-title mb-0">Notifications</h5>
                                    </div>
                                    <!--//dropdown-menu-title-->
                                    <div class="dropdown-menu-content">
                                        <div class="item p-3">
                                            <em>No notifications.</em>
                                        </div>
                                    </div>
                                    <!--//dropdown-menu-content-->

                                    <div class="dropdown-menu-footer p-2 text-center">
                                        <a href="http://php/core/index.php/admin/notifications">View all</a>
                                    </div>

                                </div>
                                <!--//dropdown-menu-->
                            </div>
                            <!--//app-utility-item-->
                            <div class="app-utility-item">
                                <a href="http://php/core/index.php/admin/settings" title="Settings">
                                    <i class="bi bi-gear icon"></i>
                                </a>
                            </div>
                            <!--//app-utility-item-->

                            <div class="app-utility-item app-user-dropdown dropdown">
                                <a class="dropdown-toggle" id="user-dropdown-toggle" data-bs-toggle="dropdown"
                                    href="#" role="button" aria-expanded="false" style="padding-top:-2px"><i
                                        class="bi bi-person-circle icon"></i></a>
                                <ul class="dropdown-menu" aria-labelledby="user-dropdown-toggle">
                                    <li><a class="dropdown-item"
                                            href="http://php/core/index.php/admin/account">Account</a></li>
                                    <li><a class="dropdown-item"
                                            href="http://php/core/index.php/admin/settings">Settings</a></li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li><a class="dropdown-item"
                                            href="http://php/core/index.php/admin/home/signOut">Sign Out <i
                                                class="bi bi-door-open text-danger ms-2"></i><i
                                                class="bi bi-arrow-right text-danger"></i></a></li>
                                </ul>
                            </div>
                            <!--//app-user-dropdown-->
                        </div>
                        <!--//app-utilities-->
                    </div>
                    <!--//row-->
                </div>
                <!--//app-header-content-->
            </div>
            <!--//container-fluid-->
        </div><!--//app-header-inner-->
        <div id="app-sidepanel" class="app-sidepanel">
            <div id="sidepanel-drop" class="sidepanel-drop"></div>
            <div class="sidepanel-inner d-flex flex-column">
                <a href="#" id="sidepanel-close" class="sidepanel-close d-xl-none">&times;</a>
                <div class="app-branding">
                    <a class="app-logo" href="http://php/core/index.php/admin/"><img class="logo-icon me-2"
                            src="http://php/core/admin/asset/images/app-logo.svg" alt="logo"><span
                            class="logo-text">Admin</span></a>

                </div><!--//app-branding-->


                <nav id="app-nav-main" class="app-nav app-nav-main flex-grow-1">
                    <ul class="app-menu list-unstyled accordion" id="menu-accordion">
                        <li class="nav-item">
                            <a class="nav-link menu-admin-home-index" href="http://php/core/index.php/admin/">
                                <span class="nav-icon">
                                    <i class="bi bi-speedometer"></i>
                                </span>
                                <span class="nav-link-text">Dashboard</span>
                            </a><!--//nav-link-->
                        </li><!--//nav-item-->

                        <li class="nav-item has-submenu">
                            <a class="nav-link submenu-toggle " href="#" data-bs-toggle="collapse"
                                data-bs-target="#submenu-docs" aria-expanded="false" aria-controls="submenu-docs">
                                <span class="nav-icon">
                                    <i class="bi bi-book"></i>
                                </span>
                                <span class="nav-link-text">Documentation</span>
                                <span class="submenu-arrow">
                                    <i class="bi bi-chevron-down"></i>
                                </span><!--//submenu-arrow-->
                            </a><!--//nav-link-->
                            <div id="submenu-docs" class="collapse submenu submenu-docs"
                                data-bs-parent="#menu-accordion">
                                <ul class="submenu-list list-unstyled">
                                    <li class="submenu-item">
                                        <a id="menu-admin-doc-framework" class="submenu-link"
                                            href="http://php/core/index.php/admin/doc">Core Framework</a>
                                    </li>
                                    <li class="submenu-item">
                                        <a id="menu-admin-user-manual" class="submenu-link"
                                            href="http://php/core/index.php/admin/doc/manual">User Manual</a>
                                    </li>

                                </ul>
                            </div>
                        </li>
                        <li class="nav-item has-submenu">
                            <a class="nav-link submenu-toggle " href="#" data-bs-toggle="collapse"
                                data-bs-target="#submenu-lab" aria-expanded="false" aria-controls="submenu-lab">
                                <span class="nav-icon">
                                    <i class="bi bi-thermometer-half"></i>
                                </span>
                                <span class="nav-link-text">Laboratory</span>
                                <span class="submenu-arrow">
                                    <i class="bi bi-chevron-down"></i>
                                </span><!--//submenu-arrow-->
                            </a><!--//nav-link-->
                            <div id="submenu-lab" class="collapse submenu submenu-lab"
                                data-bs-parent="#menu-accordion">
                                <ul class="submenu-list list-unstyled">
                                    <li class="submenu-item">
                                        <a id="menu-admin-lab-inventaris" class="submenu-link"
                                            href="http://php/core/index.php/admin/m/x/lab/inventaris">Inventory</a>
                                    </li>
                                    <li class="submenu-item">
                                        <a id="menu-admin-lab-pinjam-alat" class="submenu-link"
                                            href="http://php/core/index.php/admin/m/x/lab/pinjam">Peminjaman Alat</a>
                                    </li>
                                    <li class="submenu-item">
                                        <a id="menu-admin-lab-settings" class="submenu-link"
                                            href="http://php/core/index.php/admin/m/x/lab/settings">Settings</a>
                                    </li>
                                    <li class="submenu-item">
                                        <a id="menu-admin-lab-setup" class="submenu-link"
                                            href="http://php/core/index.php/admin/m/x/lab/setup">Setup</a>
                                    </li>

                                </ul>
                            </div>
                        </li>
                        <li class="nav-item has-submenu">
                            <a class="nav-link submenu-toggle " href="#" data-bs-toggle="collapse"
                                data-bs-target="#submenu-mta" aria-expanded="false" aria-controls="submenu-mta">
                                <span class="nav-icon">
                                    <i class="bi bi-bus-front"></i>
                                </span>
                                <span class="nav-link-text">Malang Assistant</span>
                                <span class="submenu-arrow">
                                    <i class="bi bi-chevron-down"></i>
                                </span><!--//submenu-arrow-->
                            </a><!--//nav-link-->
                            <div id="submenu-mta" class="collapse submenu submenu-mta"
                                data-bs-parent="#menu-accordion">
                                <ul class="submenu-list list-unstyled">
                                    <li class="submenu-item">
                                        <a id="menu-admin-mta-navigation" class="submenu-link active"
                                            href="http://php/core/index.php/admin/m/x/mta/home/navigation">Navigation</a>
                                    </li>
                                    <li class="submenu-item">
                                        <a id="menu-admin-mta-line" class="submenu-link"
                                            href="http://php/core/index.php/admin/m/x/mta">Line</a>
                                    </li>
                                    <li class="submenu-item">
                                        <a id="menu-admin-mta-network" class="submenu-link"
                                            href="http://php/core/index.php/admin/m/x/mta/home/network">Network</a>
                                    </li>
                                    <li class="submenu-item">
                                        <a id="menu-admin-mta-interchange" class="submenu-link"
                                            href="http://php/core/index.php/admin/m/x/mta/home/interchange">Interchange</a>
                                    </li>
                                    <li class="submenu-item">
                                        <a id="menu-admin-mta-stop" class="submenu-link"
                                            href="http://php/core/index.php/admin/m/x/mta/home/Stop">Stops</a>
                                    </li>
                                    <li class="submenu-item">
                                        <a id="menu-admin-mta-settings" class="submenu-link"
                                            href="http://php/core/index.php/admin/m/x/mta/home/settings">Settings</a>
                                    </li>
                                    <li class="submenu-item">
                                        <a id="menu-admin-mta-line-import" class="submenu-link"
                                            href="http://php/core/index.php/admin/m/x/mta/home/import">Import GPX</a>
                                    </li>
                                    <li class="submenu-item">
                                        <a id="menu-admin-mta-compression" class="submenu-link"
                                            href="http://php/core/index.php/admin/m/x/mta/compression">Compression
                                            Test</a>
                                    </li>
                                    <li class="submenu-item">
                                        <a id="menu-admin-mta-setup" class="submenu-link"
                                            href="http://php/core/index.php/admin/m/x/mta/setup">Setup</a>
                                    </li>

                                </ul>
                            </div>
                        </li>

                    </ul> <!--//app-menu-->
                </nav> <!--//app-nav-->
                <div class="app-sidepanel-footer">
                    <nav class="app-nav app-nav-footer">
                        <ul class="app-menu footer-menu list-unstyled">
                            <li class="nav-item">
                                <a class="nav-link menu-admin-settings-index"
                                    href="http://php/core/index.php/admin/settings">
                                    <span class="nav-icon">
                                        <i class="bi bi-gear"></i>
                                    </span>
                                    <span class="nav-link-text">Settings</span>
                                </a> <!--//nav-link-->
                            </li> <!--//nav-item-->
                        </ul> <!--//footer-menu-->
                    </nav>
                </div>
                <!--//app-sidepanel-footer-->

            </div>
            <!--//sidepanel-inner-->
        </div><!--//app-sidepanel-->
    </header> <!--//app-header-->
    <div class="app-wrapper pt-5 mt-2 flex-grow-1 d-flex align-items-stretch flex-column">

        <div id="mta-nav" class="p-3 border-top">
            <button class="btn btn-primary btn-dijkstra">Process</button>
            <button class="btn btn-primary" id="btn-generateRandom">Generate Random</button>
        </div>
        <h5>DIJKSTRA</h5>
        <br>
        <div class="row">
            <div class="col-12">
                <h5>Setting ACO</h5>
            </div>
            <div class="col-md-3">
                <label>numAnts</label>
                <input type="form-control" id="numAnts" value="5" placeholder="numAnts">
            </div>
            <div class="col-md-3">
                <label>numIterations</label>
                <input type="form-control" id="numIterations" value="30" placeholder="numIterations">
            </div>
        </div>
        <div id="map" class="flex-fill"></div>
        <!-- <h5>ACO</h5>
<div id="mapAco" class="flex-fill"></div> -->
        <div id="mta-controls" class="p-3 border-top">
            <button id="btn-clear-map" class="btn btn-primary">Clear</button>
        </div>
        <div id="mta-navigation" class="card shadow" style="width: 500px; display:none;">
            <div class="card-header app-card-header"></div>
            <div class="card-body">
                <div class="navigation-content" style="overflow-y:scroll;max-height: 50vh;"></div>
                <div class="d-flex justify-content-between mt-3">
                    <span>
                        <button
                            class="app-btn-close-dialog btn btn-outline-secondary border border-secondary">Close</button>
                    </span>
                </div>
            </div>
        </div>
        <div id="mta-poly-context" class="p-3 position-absolute bg-white border rounded-3" style="display:none;">
            <button id="btn-save-line" class="btn btn-sm btn-success text-light px-4">Save</button>
            <button id="btn-hide-line" class="btn btn-sm btn-secondary text-light"><i
                    class="bi bi-eye-slash"></i></button>
            <button id="btn-delete-line" class="btn btn-sm btn-danger text-light ms-5"><i
                    class="bi bi-exclamation-triangle"></i> DELETE</button>
        </div>
    </div> <!--//app-wrapper-->
    <div class="card shadow app-card app-dialog" style="display:none">
        <div class="app-card-header ps-4 d-flex align-items-center">
            <span class="title flex-grow-1"></span>
            <button type="button" class="btn-close app-btn-close-dialog" aria-label="Close"></button>
        </div>
        <div class="app-card-body pt-4 px-4"></div>
        <div class="app-card-footer p-4">
            <a href="#" class="btn btn-primary"></a>
        </div>
    </div>

    <div class="card app-card shadow app-dialog-info" style="display:none">
        <div class="app-card-body px-4 py-0 mt-4"></div>
        <div class="app-card-footer p-4 mt-auto">
            <div class="text-center">
                <a href="#" class="btn btn-primary app-btn-close-dialog ps-5 pe-5">OK</a>
            </div>
        </div>
    </div>

    <div class="card app-card shadow app-dialog-confirm" style="display:none">
        <div class="app-card-body px-4 py-0 mt-4"></div>
        <div class="app-card-footer p-4 mt-auto">
            <div class="text-center">
                <a href="#" class="btn app-btn-secondary app-btn-close-dialog ps-5 pe-5">No</a>
                <a href="#" class="btn app-btn-primary app-btn-positive-dialog ps-5 pe-5">Yes</a>
            </div>
        </div>
    </div>
</body>
<!-- Scripts placed at the end of the document so the pages load faster -->
<script type="text/javascript" src="http://php/core/.asset/core/vendor/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="http://php/core/.asset/core/vendor/pako/pako.min.js"></script>
<script type="text/javascript" src="http://php/core/.asset/core/js/core-clients.js"></script>
<script type="text/javascript" src="http://php/core/.asset/vendor/jquery-resizable/jquery-resizable.min.js"></script>
<script type="text/javascript" src="http://php/core/.asset/vendor/popper.min.js"></script>
<script type="text/javascript" src="http://php/core/.asset/vendor/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="http://php/core/.asset/vendor/interact/interact.min.js"></script>
<script type="text/javascript" src="http://php/core/.asset/core/vendor/core-ui/core.ui.js"></script>
<script type="text/javascript" src="http://php/core/admin/asset/js/app.js"></script>
<script>
    var jsonInterchanges = JSON.parse(`{!! json_encode($interchanges) !!}`);
    var jsonLines = JSON.parse(`{!! json_encode($lines) !!}`)
    var jsonLinesPoint = JSON.parse(`{!! json_encode($linesPoint) !!}`)
    console.log(jsonInterchanges)
    console.log(jsonLines)
    console.log(jsonLinesPoint)
</script>
{{-- <script src="{{ asset('assets/js/navigation.js') }}"></script> --}}
<script src="{{ asset('assets/js/navigation-v2.js') }}"></script>
</script>

</html>
